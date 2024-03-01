<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

    public function recentlyDeleted($id)
    {
        // Retrieve the recently deleted todos for the specified user
        $recentlyDeleted = TodoList::onlyTrashed()
            ->where('user_id', $id)
            ->latest()
            ->get();

        // Return the recently deleted todos as a JSON response
        return response()->json($recentlyDeleted, 200);
    }


    public function undoDelete($id)
    {
        try {
            // Find the recently deleted todo list item by ID
            $todo = TodoList::withTrashed()->findOrFail($id);

            // Restore the recently deleted todo list item
            $todo->restore();

            // Return a success message
            return response()->json(['message' => 'Todo item restored successfully'], 200);
        } catch (ModelNotFoundException $e) {
            // Handle the case where the todo item is not found
            return response()->json(['error' => 'Todo item not found'], 404);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function permanentlyDelete($id)
    {
        try {
            // Find the todo list item to permanently delete
            $todo = TodoList::withTrashed()->findOrFail($id);

            // Permanently delete the todo list item
            $todo->forceDelete();

            // Return a success message
            return response()->json(['message' => 'Todo item permanently deleted'], 200);
        } catch (ModelNotFoundException $e) {
            // Handle the case where the todo item is not found
            return response()->json(['error' => 'Todo item not found'], 404);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
