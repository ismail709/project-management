import Header from '@/components/dashboard/Header';
import Heading from '@/components/ui/Heading';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Index({ projects }) {
    return (
        <div className="grid grid-rows-[60px_1fr]">
            <Header />
            <div className="flex justify-between p-4">
                <Heading title="My projects" />
                <Link className="rounded-md bg-black px-4 py-2 text-white" href={route('projects.create')}>
                    Add
                </Link>
            </div>
            <div className='px-4 flex gap-2'>
                {projects.map((p, i) => {
                    return (
                        <div key={i}>
                            <Link className="block h-20 w-40 border rounded-md flex justify-center items-center hover:bg-gray-200 capitalize" href={route('dashboard.index', p.id)}>
                                {p.project_name}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
