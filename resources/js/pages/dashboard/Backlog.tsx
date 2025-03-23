import Modal from '@/components/common/Modal';
import Task from '@/components/dashboard/Task';
import TaskDetails from '@/components/dashboard/TaskDetails';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import InputError from '@/components/ui/InputError';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';

export default function Backlog({ project, tasks, taskTypes }) {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [AddTaskErrors, setAddTaskErrors] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const taskDetailsRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectedTask && taskDetailsRef.current && !taskDetailsRef.current.contains(event.target) && !event.target.closest('.task-item')) {
                setSelectedTask(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedTask]);

    useEffect(() => {
        if (!isAddTaskModalOpen) setAddTaskErrors(null);
    }, [isAddTaskModalOpen]);

    return (
        <>
            <div className="flex grow flex-col gap-4 overflow-auto p-4">
                <Heading title="Backlog" description="Here you can manage your tasks." />
                <div className="flex grow flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">Product Backlog</p>
                        <div>
                            <Button onClick={() => setIsAddTaskModalOpen(true)} size="small">
                                New task
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md bg-gray-200 p-2">
                        {tasks.map((task, i) => (
                            <Task
                                className="task-item"
                                onClick={(e) => {
                                    if (!e.target.closest('.task-menu')) {
                                        setSelectedTask((prevSelectedTask) => {
                                            if (prevSelectedTask?.id !== task.id) {
                                                return task;
                                            } else {
                                                return prevSelectedTask;
                                            }
                                        });
                                    }
                                }}
                                task={task}
                                key={i}
                            />
                        ))}
                        {!tasks.length && <p className="text-center text-sm text-gray-500">No tasks created yet.</p>}
                    </div>
                </div>
            </div>
            <AnimatePresence mode="wait">
                {selectedTask && (
                    <motion.div
                        ref={taskDetailsRef}
                        key={selectedTask.id}
                        style={{ originX: 1 }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TaskDetails task={selectedTask} />
                    </motion.div>
                )}
            </AnimatePresence>
            <Modal title="Add new task" isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        formData.append('project_id', project.id);
                        router.post(route('tasks.store'), formData, {
                            onSuccess: () => {
                                setIsAddTaskModalOpen(false);
                                setAddTaskErrors(null);
                            },
                            onError: (err) => setAddTaskErrors(err),
                        });
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="task_title">Title</Label>
                            <Input id="task_title" name="task_title" />
                            <InputError msg={AddTaskErrors?.task_title} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="task_description">Description</Label>
                            <Textarea id="task_description" name="task_description" />
                            <InputError msg={AddTaskErrors?.task_description} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="task_type_id">Task type</Label>
                            <Select id="task_type_id" name="task_type_id" className="capitalize" defaultValue="">
                                <option value="" disabled>
                                    -- Select a type --
                                </option>
                                {taskTypes.map((taskType, i) => (
                                    <option key={i} value={taskType.id} className="">
                                        {taskType.task_type_name}
                                    </option>
                                ))}
                            </Select>
                            <InputError msg={AddTaskErrors?.task_type_id} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="task_priority">Task priority</Label>
                            <Select id="task_priority" name="task_priority" className="capitalize" defaultValue="regular">
                                <option value="low" className="">
                                    Low
                                </option>
                                <option value="regular" className="">
                                    Regular
                                </option>
                                <option value="high" className="">
                                    High
                                </option>
                                <option value="critical" className="">
                                    Critical
                                </option>
                            </Select>
                            <InputError msg={AddTaskErrors?.task_priority} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="estimated_days">
                                Estimated days <span className="text-sm text-gray-500">(optional)</span>
                            </Label>
                            <Input type="number" id="estimated_days" name="estimated_days" />
                            <InputError msg={AddTaskErrors?.estimated_days} />
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

Backlog.layout = (page) => <DashboardLayout children={page} />;
