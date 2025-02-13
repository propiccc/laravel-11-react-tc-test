<?php

namespace App\Http\Controllers;

use App\Helpers\RestApi;
use App\Models\Posts;
use App\Models\PostsTag;
use App\Models\Tags;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    protected $model, $modelPostTag;

    public function __construct()
    {
        $this->model = Posts::query();
        $this->modelPostTag = PostsTag::query();
    }

    // ? Get Data Tags With Paginate
    public function Get(Request $request)
    {
        try {
            $orderBy = $request->has('order_by') ? $request->order_by : 'created_at';
            $orderType = $request->has('order_type') ? $request->order_type : 'asc';
            $limit = $request->has('limit') ? $request->limit : 10;
            $data = $this->model->orderBy($orderBy, $orderType)->paginate($limit);

            return RestApi::success($data, 200);
        } catch (\Throwable $exception) {
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    public function PublicPost(Request $request)
    {
        try {
            $data = $this->model->with(['PostsTag', 'Comments']);
            $orderBy = $request->has('order_by') ? $request->order_by : 'created_at';
            $orderType = $request->has('order_type') ? $request->order_type : 'asc';
            $limit = $request->has('limit') ? $request->limit : 10;
            $search = $request->has('search') ? $request->search : null;
            $FilterTag = $request->tag != 'all-tag' ? $request->tag : null;
            if (!empty($FilterTag)) {
                $data = $data->whereHas('PostsTag', function ($query) use ($FilterTag) {
                    return $query->where('tags_id', $FilterTag);
                });
            }

            if (!empty($search)) {
                $data = $data
                    ->where('title', 'LIKE', '%' . $request->search . "%")
                    ->orWhere('content', 'LIKE', '%' . $request->search . "%")
                    ->orderBy($orderBy, $orderType)->paginate($limit);
            } else {
                $data = $this->model->orderBy($orderBy, $orderType)->paginate($limit);
            }

            return RestApi::success($data, 200);
        } catch (\Throwable $exception) {
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    public function PostsDetail($uuid)
    {
        try {
            $data = $this->model->with(['Comments'])->where('uuid', $uuid)->first();
            if (!isset($data->id)) {
                return RestApi::error('Data Not Found', 404);
            }

            $data = $data->toArray();
            $postTags = $this->modelPostTag->with(['Tag'])->where('post_id', $data['id'])->get();
            foreach ($postTags as $index => $item) {
                $data['tags'][] = ['value' =>  $item->Tag->id, 'label' =>  $item->Tag->tags_name];
            }

            return RestApi::success($data, 200, 'Data Tag');
        } catch (\Throwable $exception) {
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    // ? Store Data tegs In the Database
    public function Store(Request $request)
    {

        $request['tags'] = json_decode($request->tags, true);

        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'min:2'],
            'content' => ['required', 'string', 'min:4'],
            'tags' => ['nullable', 'array'],
            'tags.*.value' => ['nullable', 'exists:tags,id'],
        ]);


        if ($validator->fails()) {
            return RestApi::error("Validation Errors", 422, [
                'errors' => $validator->errors()->messages()
            ]);
        }

        DB::beginTransaction();
        try {

            $data = $this->model->create([
                'title' => $request->title,
                'content' => $request->content
            ]);

            foreach ($request->tags as $item) {
                $this->modelPostTag->create([
                    'post_id' => $data->id,
                    'tags_id' => $item['value']
                ]);
            }

            DB::commit();
            return RestApi::success($data, 201, 'Success');
        } catch (\Throwable $exception) {
            DB::rollBack();
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    // ? Get data tag
    public function Show($uuid)
    {
        try {
            $data = $this->model->where('uuid', $uuid)->first();
            if (!isset($data->id)) {
                return RestApi::error('Data Not Found', 404);
            }

            $data = $data->toArray();
            $postTags = $this->modelPostTag->with(['Tag'])->where('post_id', $data['id'])->get();
            foreach ($postTags as  $item) {
                $data['tags'][] = ['value' =>  $item->Tag->id, 'label' =>  $item->Tag->tags_name];
            }

            return RestApi::success($data, 200, 'Data Posts');
        } catch (\Throwable $exception) {
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    // ? Update Data Tags
    public function Update($uuid, Request $request)
    {
        $request['tags'] = json_decode($request->tags, true);
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'min:2'],
            'content' => ['required', 'string', 'min:4'],
            'tags' => ['nullable', 'array'],
            'tags.*.value' => ['nullable', 'exists:tags,id'],
        ]);

        if ($validator->fails()) {
            return RestApi::error("Validation Errors", 422, [
                'errors' => $validator->errors()->messages()
            ]);
        }

        // ? Find Data Tags
        $data = $this->model->where('uuid', $uuid)->first();
        if (!isset($data->id)) {
            return RestApi::error('Data Not Found', 404);
        }

        DB::beginTransaction();
        try {

            $data->update([
                'title' => $request->title,
                'content' => $request->content
            ]);

            $oldPostTags = $this->modelPostTag->where('post_id', $data->id)->get();
            foreach ($oldPostTags as $postTag) {
                $postTag->delete();
            }

            foreach ($request->tags as $item) {
                $this->modelPostTag->create([
                    'post_id' => $data->id,
                    'tags_id' => $item['value']
                ]);
            }

            DB::commit();
            return RestApi::success($data, 200, 'Updated');
        } catch (\Throwable $exception) {
            DB::rollBack();
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    public function Destroy($uuid)
    {
        $data = $this->model->where('uuid', $uuid)->first();
        if (!isset($data->id)) {
            return RestApi::error('Data Not Found', 404);
        }

        DB::beginTransaction();

        try {
            $oldPostTags = $this->modelPostTag->where('post_id', $data->id)->get();
            foreach ($oldPostTags as $postTag) {
                $postTag->delete();
            }

            $data->delete();
            DB::commit();
            return RestApi::success(null, 200, 'Deleted');
        } catch (\Throwable $exception) {
            DB::rollBack();
            return RestApi::error($exception->getMessage(), 500);
        }
    }
}
