<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request){
        $validated = $request->validate([
            "project_id" => "required|exists:projects,id",
            "task_title" => "required|string|max:255",
            "task_description" => "nullable|string|max:255",
            "task_type_id" => "required|exists:task_types,id",
            "task_priority" => "nullable|string",
            "task_status" => "nullable|string",
            "estimated_days" => 'nullable|integer|min:1|max:999',
        ]);

        $request->user()->tasks()->create($validated);

        return back();
    }

    public function update(Request $request, Task $task){
        $task->update($request->all());

        return back();
    }
    public function unassignAll(Request $request, Task $task){
        $task->assignedTo()->detach();

        return back();
    }
    public function assign(Request $request, Task $task){
        $users = $request->users;

        $task->assignedTo()->detach();

        $task->assignedTo()->attach($users);

        return back();
    }
    public function changeType(Request $request, Task $task){
        $task->task_type_id = $request->type;
        $task->save();

        return back();
    }
    public function destroy(Request $request, Task $task){
        $task->delete();

        return back();
    }
}
