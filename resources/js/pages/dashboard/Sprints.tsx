import { Draggable } from '@/components/common/Draggable';
import Droppable from '@/components/common/Droppable';
import Modal from '@/components/common/Modal';
import Task from '@/components/dashboard/Task';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import InputError from '@/components/ui/InputError';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import DashboardLayout from '@/layouts/dashboard-layout';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Sprints({ project, tasks, sprints }) {
    const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);
    const [AddSprintErrors, setAddSprintErrors] = useState(null);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [selectedSprintTasks, setSelectedSprintTasks] = useState([]);
    const [productBacklog, setProductBacklog] = useState(tasks.filter((task) => task.sprint_id == null));
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (!isAddSprintModalOpen) setAddSprintErrors(null);
    }, [isAddSprintModalOpen]);

    useEffect(() => {
        console.log('SELECTED SPRINT CHNAGED', selectedSprint);
        if (selectedSprint) setSelectedSprintTasks(sprints.find((s) => s.id == selectedSprint).tasks);
    }, [selectedSprint]);

    const findContainer = (id) => {
        if (['product-backlog', 'sprint-backlog'].includes(id)) return id;
        return productBacklog.some((task) => task.id == id) ? 'product-backlog' : 'sprint-backlog';
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

        if (overContainer == 'product-backlog') {
            const newTask = selectedSprintTasks.find((task) => task.id == active.id);
            if (newTask) {
                setProductBacklog((prev) => [...prev, newTask]);
                setSelectedSprintTasks((prev) => prev.filter((task) => task.id != active.id));
            }
        } else {
            const newTask = productBacklog.find((task) => task.id == active.id);
            if (newTask) {
                setSelectedSprintTasks((prev) => [...prev, newTask]);
                setProductBacklog((prev) => prev.filter((task) => task.id != active.id));
            }
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const overContainer = findContainer(over.id);
        if (overContainer == 'product-backlog') {
            if (selectedSprint) router.put(route('tasks.update', active.id), { sprint_id: null }, { preserveState: true });
        } else {
            router.put(route('tasks.update', active.id), { sprint_id: selectedSprint }, { preserveState: true });
        }
    };

    return (
        <>
            <div className="flex grow flex-col gap-4 overflow-auto p-4">
                <Heading title="Sprints" description="Here you can manage your sprints." />
                <div className="flex grow flex-col gap-2">
                    <div className="flex flex-row-reverse items-center">
                        <div>
                            <Button onClick={() => setIsAddSprintModalOpen(true)} size="small">
                                New sprint
                            </Button>
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
                        <div className="grid grow grid-cols-2 grid-rows-[auto_1fr] items-center gap-x-2">
                            <p className="py-2">Product Backlog</p>
                            <div className="flex items-center justify-between py-2">
                                <p className="">Sprint Backlog</p>
                                <div className='flex items-center gap-2'>
                                    <Select className="capitalize" onChange={(e) => setSelectedSprint(e.target.value)} defaultValue="">
                                        <option value="" disabled>
                                            Select Sprint
                                        </option>
                                        {sprints.map((sprint, i) => (
                                            <option key={i} value={sprint.id}>
                                                {sprint.sprint_name}
                                            </option>
                                        ))}
                                    </Select>
                                    {selectedSprint && (
                                        <Link className='bg-red-600 hover:bg-red-500 p-1 rounded-md cursor-pointer' preserveState={false} method='delete' href={route('sprints.destroy', selectedSprint)} onSuccess={() => setSelectedSprint(null)}>
                                            <Trash2 color='white' />
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <Droppable id="product-backlog" className="h-full">
                                <div className="flex h-full flex-col gap-2 rounded-md bg-gray-200 p-2">
                                    {productBacklog.map((task, i) => (
                                        <Draggable id={task.id} key={i}>
                                            <Task canEdit={false} className="task-item" task={task} />
                                        </Draggable>
                                    ))}
                                    {!productBacklog.length && (
                                        <div className="flex grow items-center justify-center">
                                            <p className="text-center text-xl text-gray-500">No tasks left</p>
                                        </div>
                                    )}
                                </div>
                            </Droppable>
                            {!selectedSprint && (
                                <div className="flex h-full flex-col gap-2 rounded-md bg-gray-200 p-2">
                                    <div className="flex grow items-center justify-center">
                                        <p className="text-center text-xl text-gray-500">Select Sprint</p>
                                    </div>
                                </div>
                            )}
                            {selectedSprint && (
                                <Droppable id="sprint-backlog" className="h-full">
                                    <div className="flex h-full flex-col gap-2 rounded-md bg-gray-200 p-2">
                                        {selectedSprintTasks.length > 0 &&
                                            selectedSprintTasks.map((task, i) => (
                                                <Draggable id={task.id} key={i}>
                                                    <Task canEdit={false} className="task-item" task={task} />
                                                </Draggable>
                                            ))}
                                        {!selectedSprintTasks.length && (
                                            <div className="flex grow items-center justify-center">
                                                <p className="text-center text-xl text-gray-500">Drag & Drop Tasks Here</p>
                                            </div>
                                        )}
                                    </div>
                                </Droppable>
                            )}
                        </div>
                    </DndContext>
                </div>
            </div>
            <Modal title="Add new sprint" isOpen={isAddSprintModalOpen} onClose={() => setIsAddSprintModalOpen(false)}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        formData.append('project_id', project.id);
                        router.post(route('sprints.store'), formData, {
                            onSuccess: () => {
                                setIsAddSprintModalOpen(false);
                                setAddSprintErrors(null);
                            },
                            onError: (err) => setAddSprintErrors(err),
                        });
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="sprint_name">Name</Label>
                            <Input id="sprint_name" name="sprint_name" />
                            <InputError msg={AddSprintErrors?.sprint_name} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="start_date">Start date</Label>
                            <Input id="start_date" name="start_date" type="date" />
                            <InputError msg={AddSprintErrors?.start_date} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="end_date">End date</Label>
                            <Input id="end_date" name="end_date" type="date" />
                            <InputError msg={AddSprintErrors?.end_date} />
                        </div>
                        <div className="flex flex-row-reverse gap-2">
                            <Button type="submit">Create</Button>
                            <Button style="secondary" onClick={() => setIsAddTaskModalOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Sprints.layout = (page) => <DashboardLayout children={page} />;
