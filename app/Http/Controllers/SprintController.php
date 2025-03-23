<?php

namespace App\Http\Controllers;

use App\Models\Sprint;
use Illuminate\Http\Request;

class SprintController extends Controller
{
    public function store(Request $request){
        $validated = $request->validate([
            "project_id" => "required|exists:projects,id",
            "sprint_name" => "required|string|max:255",
            "start_date" => "required|date|after_or_equal:today",
            "end_date" => "required|date|after_or_equal:today",
        ]);

        Sprint::create($validated);

        return back();
    }

    public function destroy(Sprint $sprint){
        $tasks = $sprint->tasks;

        foreach ($tasks as $task) {
            $task->sprint_id = null;
            $task->save();
        }

        $sprint->delete();

        return back();
    }
}
