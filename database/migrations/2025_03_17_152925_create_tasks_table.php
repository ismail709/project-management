<?php

use App\Models\Project;
use App\Models\Sprint;
use App\Models\TaskType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_task_id')->nullable()->constrained('tasks')->nullOnDelete();
            $table->foreignIdFor(Sprint::class)->nullable()->constrained()->nullOnDelete();
            $table->foreignIdFor(Project::class)->constrained()->cascadeOnDelete();
            $table->string('task_title');
            $table->text('task_description')->nullable();
            $table->foreignIdFor(TaskType::class)->nullable()->constrained()->nullOnDelete();
            $table->enum('task_priority',['low','regular','high','critical'])->default('regular');
            $table->enum('task_status',['todo','in_progress','done'])->default('todo');
            $table->integer('estimated_days')->nullable();
            $table->integer('actual_days')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
