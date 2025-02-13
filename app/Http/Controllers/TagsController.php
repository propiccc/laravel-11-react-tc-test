<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Tags;
use App\Helpers\RestApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TagsController extends Controller
{

    protected $model;

    public function __construct()
    {
        $this->model = Tags::query();
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

    // ? Store Data tegs In the Database
    public function Store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tags_name' => ['required', 'string', 'min:2'],
        ]);

        if ($validator->fails()) {
            return RestApi::error("Validation Errors", 422, [
                'errors' => $validator->errors()->messages()
            ]);
        }

        DB::beginTransaction();
        try {

            $data = $this->model->create([
                'tags_name' => $request->tags_name
            ]);

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
            return RestApi::success($data, 200, 'Data Tag');
        } catch (\Throwable $exception) {
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    // ? Update Data Tags
    public function Update($uuid, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tags_name' => ['required', 'string', 'min:2'],
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
                'tags_name' => $request->tags_name
            ]);

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

            $data->delete();
            DB::commit();
            return RestApi::success(null, 200, 'Deleted');
        } catch (\Throwable $exception) {
            DB::rollBack();
            return RestApi::error($exception->getMessage(), 500);
        }
    }

    public function GetSelect()
    {

        $select = [];
        $data = $this->model->get();
        // $select[] = ['label' => 'Pilih', 'value' => null];
        foreach ($data as $item) {
            $select[] = ['label' => $item->tags_name, 'value' => $item->id];
        }

        return RestApi::success($select, 200);
    }

}
