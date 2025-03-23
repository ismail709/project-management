import { Link, router, usePage } from '@inertiajs/react';
import { cx } from 'class-variance-authority';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';
import Modal from '../common/Modal';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

export default function Team({ team, className, canEdit = true, ...props }) {
    const { users } = usePage().props;
    console.log(team)

    const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
    const menuRef = useRef();
    const teamMenuBtnRef = useRef();
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isAssigningModalOpen, setIsAssigningModalOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target) && !teamMenuBtnRef.current.contains(event.target)) {
                setIsTeamMenuOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            <div {...props} className={cx('flex cursor-pointer items-center justify-between rounded-sm bg-white p-2', className)}>
                <div>
                    <p className="text-sm capitalize">{team.team_name}</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex -space-x-4">
                        {team.members.map((user, i) => {
                            return <Avatar className="ring-2" user={user} key={i} />;
                        })}
                        {!team.members.length && <Avatar />}
                    </div>
                    {canEdit && (
                        <div className="task-menu relative">
                            <Button ref={teamMenuBtnRef} onClick={() => setIsTeamMenuOpen((prev) => !prev)} style="secondary" size="xs">
                                <Ellipsis size="16" />
                            </Button>
                            {isTeamMenuOpen && (
                                <div
                                    ref={menuRef}
                                    className="absolute right-0 bottom-full z-10 w-56 divide-y divide-gray-200 rounded-md bg-white shadow-lg"
                                >
                                    <div className="">
                                        <Link
                                            onClick={() => {
                                                setIsTeamMenuOpen(false);
                                                setIsAssigningModalOpen(true);
                                            }}
                                            className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                            as="button"
                                            preserveState
                                        >
                                            Assign to...
                                        </Link>
                                        <Link
                                            onClick={() => setIsTeamMenuOpen(false)}
                                            className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                            href={route('tasks.unassignall', task)}
                                            method="post"
                                        >
                                            Unassign
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            onClick={() => {
                                                setIsTeamMenuOpen(false);
                                                setIsDeleteConfirmationOpen(true);
                                            }}
                                            className="block w-full cursor-pointer rounded-b-md px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-200"
                                            as="button"
                                            preserveState
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {canEdit && (
                <Modal title="Delete confirmation" isOpen={isDeleteConfirmationOpen} onClose={() => setIsDeleteConfirmationOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <p>Are you sure you want to delete this task?</p>
                        <div className="flex flex-row-reverse gap-2">
                            <Link
                                className="block cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white"
                                href={route('tasks.destroy', team)}
                                method="delete"
                                onSuccess={() => setIsDeleteConfirmationOpen(false)}
                            >
                                Delete
                            </Link>
                            <Button style="secondary" onClick={() => setIsDeleteConfirmationOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
            {canEdit && (
                <Modal title="Task assignment" isOpen={isAssigningModalOpen} onClose={() => setIsAssigningModalOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <p>Choose users from the list:</p>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                router.post(route('tasks.assign', team), new FormData(e.target), {
                                    onSuccess: () => setIsAssigningModalOpen(false),
                                });
                            }}
                        >
                            <div className="flex flex-col gap-2 rounded-md bg-gray-200 p-2">
                                {users.map((user, i) => {
                                    return (
                                        <label
                                            className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                            htmlFor={user.id}
                                            key={i}
                                        >
                                            <Checkbox
                                                defaultChecked={task.assigned_to.some((u) => u.id === user.id)}
                                                id={user.id}
                                                value={user.id}
                                                name="users[]"
                                            />
                                            <Avatar size="small" user={user} />
                                            <p className="text-sm capitalize">{user.name}</p>
                                        </label>
                                    );
                                })}
                            </div>

                            <div className="flex flex-row-reverse gap-2">
                                <Button type="submit">Assign</Button>
                                <Button style="secondary" onClick={() => setIsDeleteConfirmationOpen(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    );
}
