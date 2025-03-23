<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\ProjectType;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = $request->user()->memberProjects;

        return Inertia::render('projects/Index', [
            'projects' => $projects
        ]);
    }

    public function show(Project $project) {
        // tasks
        $tasks = $project->tasks;

        return Inertia::render('dashboard/Index',[
            "tasks" => $tasks,
            "project" => $project
        ]);
    }

    public function create(){
        $projectTypes = ProjectType::all();
        return Inertia::render('projects/Create',[
            'projectTypes' => $projectTypes
        ]);
    }

    public function store(ProjectRequest $request){
        $request->user()->projects()->create($request->validated());

        return to_route('projects.index');
    }
}
