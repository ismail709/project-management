import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import DashboardLayout from '@/layouts/dashboard-layout';

export default function Board({ tasks }) {
    console.log(tasks);
    return (
        <div className="flex grow flex-col gap-4 overflow-auto p-4">
            <Heading title="Sprints" description="Here you can manage your sprints." />
            <div className="flex grow flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm">Product Backlog</p>
                    <div>
                        <Button onClick={() => console.log("manage sprints")} size="small">
                            Manage sprints
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Board.layout = (page) => <DashboardLayout children={page} />;
