<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    /**
     * Get the list of todos for a specific user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id)
    {
        // Retrieve the todos for the specified user
        $todos = TodoList::where('user_id', $id)->latest()->get();

        // Return the todos as a JSON response
        return response()->json($todos, 200);
    }

    public function store(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'task_name' => 'required',
            ]);

            $param = [
                'task_name' => $request->task_name,
                'status' => $request->status,
                'user_id' => $request->user_id,
            ];

            // Create a new todo list item
            $todo = TodoList::create($param);

            // Return the created todo as a JSON response
            return response()->json($todo, 200);
        } catch (\Exception $e) {
            // Handle the exception
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {

        $param = [
            'task_name' => $request->task_name,
            'status' => $request->status,
            'user_id' => $request->user_id,
        ];
        $todo = TodoList::whereId($id)->update($param);
        return response()->json($todo, 200);
    }

    public function destroy($id)
    {

        $todo = TodoList::find($id);
        $todo->delete();
        return response()->json($todo, 200);
    }
}
