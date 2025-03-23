import Modal from '@/components/common/Modal';
import Team from '@/components/dashboard/Team';
import TeamDetails from '@/components/dashboard/TeamDetails';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import InputError from '@/components/ui/InputError';
import Label from '@/components/ui/Label';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';

export default function Teams({ project, teams }) {
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
    const [AddTeamErrors, setAddTeamErrors] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const teamDetailsRef = useRef();

    console.log(teams);

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectedTeam && teamDetailsRef.current && !teamDetailsRef.current.contains(event.target) && !event.target.closest('.team-item')) {
                setSelectedTeam(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedTeam]);

    useEffect(() => {
        if (!isAddTeamModalOpen) setAddTeamErrors(null);
    }, [isAddTeamModalOpen]);

    return (
        <>
            <div className="flex grow flex-col gap-4 overflow-auto p-4">
                <Heading title="Teams" description="Here you can manage your teams and members." />
                <div className="flex grow flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">Teams</p>
                        <div>
                            <Button onClick={() => setIsAddTeamModalOpen(true)} size="small">
                                New team
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md bg-gray-200 p-2">
                        {teams.map((team, i) => (
                            <Team
                                className="team-item"
                                onClick={(e) => {
                                    if (!e.target.closest('.team-menu')) {
                                        setSelectedTeam((prevTeam) => {
                                            if (prevTeam?.id !== team.id) {
                                                return team;
                                            } else {
                                                return prevTeam;
                                            }
                                        });
                                    }
                                }}
                                team={team}
                                key={i}
                            />
                        ))}
                        {!teams.length && <p className="text-center text-sm text-gray-500">No teams created yet.</p>}
                    </div>
                </div>
            </div>
            <AnimatePresence mode="wait">
                {selectedTeam && (
                    <motion.div
                        ref={teamDetailsRef}
                        key={selectedTeam.id}
                        style={{ originX: 1 }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TeamDetails team={selectedTeam} />
                    </motion.div>
                )}
            </AnimatePresence>
            <Modal title="Add new team" isOpen={isAddTeamModalOpen} onClose={() => setIsAddTeamModalOpen(false)}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        formData.append('project_id', project.id);
                        router.post(route('tasks.store'), formData, {
                            onSuccess: () => {
                                setIsAddTeamModalOpen(false);
                                setAddTeamErrors(null);
                            },
                            onError: (err) => setAddTeamErrors(err),
                        });
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="team_name">Name</Label>
                            <Input id="team_name" name="team_name" />
                            <InputError msg={AddTeamErrors?.team_name} />
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

Teams.layout = (page) => <DashboardLayout children={page} />;
