import { Draggable } from '@/components/common/Draggable';
import Droppable from '@/components/common/Droppable';
import Task from '@/components/dashboard/Task';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import DashboardLayout from '@/layouts/dashboard-layout';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function Board({ project, current_tasks, current_sprint }) {
    const [tasksList, setTasksList] = useState({
        todo: current_tasks.filter((task) => task.task_status == 'todo'),
        in_progress: current_tasks.filter((task) => task.task_status == 'in_progress'),
        done: current_tasks.filter((task) => task.task_status == 'done'),
    });
    const sensors = useSensors(useSensor(PointerSensor));
    console.log(current_tasks);

    const findContainer = (id) => {
        if(Object.keys(tasksList).includes(id))
            return id;
        return Object.entries(tasksList).find(([key, tasks]) => tasks.some(task => task.id == id))[0];
    };

    const handleDragStart = (event) => {
        // todo
    };

    const handleDragMove = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (activeContainer == overContainer) return;

        setTasksList(prevList => {
            // task to move
            const activeTask = prevList[activeContainer].find(task => task.id == active.id)

            // updated source list
            const updatedSourceList = prevList[activeContainer].filter(task => task.id != activeTask.id)

            // updated target list
            const updatedTargetList = [...prevList[overContainer],activeTask]

            return {
                ...prevList,
                [activeContainer]:updatedSourceList,
                [overContainer]:updatedTargetList
            }
        })
        
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const overContainer = findContainer(over.id);

        router.put(route('tasks.update', active.id), { task_status: overContainer }, { preserveState: true });
    };

    return (
        <div className="flex grow flex-col gap-4 overflow-auto p-4">
            <Heading title="Scrum Board" description="Here you can manage your tasks and track your progress." />
            <div className="flex grow flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="capitalize">{current_sprint ? <><span className='inline-block w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse'></span>{current_sprint.sprint_name}</> : "No active sprint"}</p>
                    <div>
                        <Link className='text-sm text-white bg-black px-4 py-2 rounded-md' href={route('dashboard.sprints',project)}>
                            Manage sprints
                        </Link>
                    </div>
                </div>
                <DndContext
                    modifiers={[restrictToWindowEdges]}
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragMove={handleDragMove}
                    onDragEnd={handleDragEnd}
                >
                    <div className="grid grow grid-cols-3 grid-rows-[auto_1fr] items-center gap-x-2">
                        <p className="py-2">Todo</p>
                        <p className="">In Progress</p>
                        <p className="">Done</p>
                        <Droppable id="todo" className="h-full">
                            <div className="flex h-full flex-col gap-2 rounded-md bg-gray-200 p-2">
                                {tasksList.todo.map((task, i) => (
                                    <Draggable id={task.id} key={i}>
                                        <Task canEdit={false} className="task-item" task={task} />
                                    </Draggable>
                                ))}
                            </div>
                        </Droppable>
                        <Droppable id="in_progress" className="h-full">
                            <div className="flex h-full flex-col gap-2 rounded-md bg-gray-200 p-2">
                                {tasksList.in_progress.map((task, i) => (
                                    <Draggable id={task.id} key={i}>
                                        <Task canEdit={false} className="task-item" task={task} />
                                    </Draggable>
                                ))}
                            </div>
                        </Droppable>
                        <Droppable id="done" className="h-full">
                            <div className="flex h-full flex-col gap-2 rounded-md bg-gray-200 p-2">
                                {tasksList.done.map((task, i) => (
                                    <Draggable id={task.id} key={i}>
                                        <Task canEdit={false} className="task-item" task={task} />
                                    </Draggable>
                                ))}
                            </div>
                        </Droppable>
                    </div>
                </DndContext>
            </div>
        </div>
    );
}

Board.layout = (page) => <DashboardLayout children={page} />;
