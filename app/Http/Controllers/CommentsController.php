<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Helpers\RestApi;
use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    protected $model;

    public function __construct()
    {
        $this->model = Comments::query();
    }

    public function addCommand(Request $request, $uuid)
    {
        $validator = Validator::make($request->all(), [
            'comment' => ['required', 'string', 'min:2'],
        ]);


        if ($validator->fails()) {
            return RestApi::error("Validation Errors", 422, [
                'errors' => $validator->errors()->messages()
            ]);
        }

        $postData = Posts::where('uuid', $uuid)->first();
        if(!isset($postData->id)){
            return RestApi::error('Data Post Not Found', 404);
        }

        DB::beginTransaction();
        try {

            $data = $this->model->create([
                'comment' => $request->comment,
                'post_id' => $postData->id,
                'user_id' => Auth::user()->id
            ]);

            DB::commit();
            return RestApi::success($data, 201, 'Success');
        } catch (\Throwable $exception) {
            DB::rollBack();
            return RestApi::error($exception->getMessage(), 500);
        }
    }
}
