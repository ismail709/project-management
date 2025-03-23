<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\TaskController;
use App\Models\Project;
use App\Models\TaskType;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Home');
    return to_route('login');
})->name('home');


Route::get('/login', function () {
    return Inertia::render('auth/Login');
})->name('login');

Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', function () {
    return Inertia::render('auth/Register');
})->name('register');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index')->middleware('auth');

Route::get('/projects/{project}/dashboard', [ProjectController::class, 'show'])->name('dashboard.index')->middleware('auth');

Route::get('/projects/{project}/dashboard/backlog', function (Project $project) {
    $tasks = $project->tasks()->with(['createdBy', 'type', 'assignedTo', 'sprint'])->get();
    $users = $project->users;
    $taskTypes = TaskType::all();
    return Inertia::render('dashboard/Backlog', [
        "project" => $project,
        "tasks" => $tasks,
        "users" => $users,
        "taskTypes" => $taskTypes
    ]);
})->name('dashboard.backlog')->middleware('auth');

Route::get('/projects/{project}/dashboard/sprints', function (Project $project) {
    return Inertia::render('dashboard/Sprints', [
        "project" => $project,
        "tasks" => $project->tasks()->with("assignedTo")->get(),
        "sprints" => $project->sprints()->with("tasks")->get()
    ]);
})->name('dashboard.sprints')->middleware('auth');

Route::get('/projects/{project}/dashboard/board', function (Project $project) {
    $activeSprint = $project->sprints()->where('sprint_status', 'active')->first();
    if ($activeSprint) {
        $tasks = $activeSprint->tasks()->with(['assignedTo'])->get();

        return Inertia::render('dashboard/Board', [
            "project" => $project,
            "current_tasks" => $tasks,
            "current_sprint" => $activeSprint
        ]);
    } else {
        return Inertia::render('dashboard/Board', [
            "project" => $project,
            "current_tasks" => [],
            "active_sprint" => null
        ]);

    }
})->name('dashboard.board')->middleware('auth');

Route::get('/projects/{project}/dashboard/teams', function (Project $project) {
    $teams = $project->teams()->with('members')->get();
    $users = $project->users;
    return Inertia::render('dashboard/Teams', [
        "project" => $project,
        "teams" => $teams,
        "users" => $users,
    ]);
})->name('dashboard.teams')->middleware('auth');

Route::get('/projects/{project}/dashboard/meetings', function (Project $project) {
    return Inertia::render('dashboard/Meetings', [
        "project" => $project
    ]);
})->name('dashboard.meetings')->middleware('auth');

Route::get('/projects/{project}/dashboard/analytics', function (Project $project) {
    return Inertia::render('dashboard/Analytics', [
        "project" => $project
    ]);
})->name('dashboard.analytics')->middleware('auth');


Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create')->middleware('auth');
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store')->middleware('auth');


// tasks

Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store')->middleware('auth');
Route::post('/tasks/{task}/unassignAll', [TaskController::class, 'unassignAll'])->name('tasks.unassignall')->middleware('auth');
Route::post('/tasks/{task}/assign', [TaskController::class, 'assign'])->name('tasks.assign')->middleware('auth');
Route::post('/tasks/{task}/changetype', [TaskController::class, 'changeType'])->name('tasks.changetype')->middleware('auth');
Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update')->middleware('auth');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy')->middleware('auth');


// sprints
Route::post('/sprints', [SprintController::class, 'store'])->name('sprints.store')->middleware('auth');
Route::delete('/sprints/{sprint}', [SprintController::class, 'destroy'])->name('sprints.destroy')->middleware('auth');

