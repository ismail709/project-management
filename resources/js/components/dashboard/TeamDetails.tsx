import { usePage } from '@inertiajs/react';
import { cx } from 'class-variance-authority';
import Avatar from '../ui/Avatar';
import Heading from '../ui/Heading';
import Label from '../ui/Label';
import Textarea from '../ui/Textarea';

export default function TeamDetails({ team, className, ...props }) {
    const { project } = usePage().props;
    
    console.log(team)
    return null;
    return (
        <div className={cx('flex w-80 flex-col gap-4 p-4 text-sm border-l-2 border-gray-200 h-full', className)}>
            <Heading title={task.task_title} />
            <div className="grid grid-cols-2 gap-y-2">
                <Label>Status</Label>
                <div className={cx('capitalize',task.task_status == "in_progress" && "animate-pulse text-green-500")}>{task.task_status.split('_').join(" ")}</div>
                <Label>Priority</Label>
                <div className='capitalize'>{task.task_priority}</div>
                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Description</Label>
                    <Textarea className="text-sm" defaultValue={task.task_description} />
                </div>
                <Label>Created by</Label>
                <div className="flex items-center gap-2 capitalize">
                    <Avatar size="small" user={task.created_by} />
                    {task.created_by.name}
                </div>
                <Label>Assignee</Label>
                <div className="flex flex-wrap gap-2 capitalize">
                    {task.assigned_to.map((user, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Avatar size="small" user={user} />
                            {user.name}
                        </div>
                    ))}
                    {!task.assigned_to.length && (
                        <div className="flex items-center gap-2">
                            <Avatar size="small" />
                            Unassigned
                        </div>
                    )}
                </div>
                <Label>Sprint</Label>
                <div>{task.sprint ? task.sprint.sprint_name : 'No data'}</div>
                <Label>Project</Label>
                <div className="capitalize">{project.project_name}</div>
                <Label>Estimated time</Label>
                <div className="">{task.estimated_days ? `${task.estimated_days} days` : 'No data'}</div>
                <Label>Created at</Label>
                <div className="">{new Date(task.created_at).toUTCString()}</div>
            </div>
        </div>
    );
}
