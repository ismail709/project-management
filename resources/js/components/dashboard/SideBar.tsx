import { Link, usePage } from '@inertiajs/react';
import { cx } from 'class-variance-authority';
import { ChartLine, Coffee, Columns3, LayoutDashboard, RefreshCw, ScrollText, Users } from 'lucide-react';
import {route} from "ziggy-js"

export default function SideBar() {
    const { url,props } = usePage();
    const project = props.project;
    const sidebarItems = [
        {
            title: 'Overview',
            link: route("dashboard.index",project),
            icon: <LayoutDashboard />,
        },
        {
            title: 'Backlog',
            link: route("dashboard.backlog",project),
            icon: <ScrollText />,
        },
        {
            title: 'Sprints',
            link: route("dashboard.sprints",project),
            icon: <RefreshCw />,
        },
        {
            title: 'Board',
            link: route("dashboard.board",project),
            icon: <Columns3 />
        },
        {
            title: 'Teams',
            link: route("dashboard.teams",project),
            icon: <Users />,
        },
        {
            title: 'Meetings',
            link: route("dashboard.meetings",project),
            icon: <Coffee />,
        },
        {
            title: 'Analytics',
            link: route("dashboard.analytics",project),
            icon: <ChartLine />
        },
    ];

    return (
        <aside className='grow bg-white border-r-2 border-gray-200'>
            <div className='p-4'>
                <h2 className='text-xl font-bold'>{project.project_name}</h2>
                <p className='text-gray-500'>{project.project_key}</p>
            </div>
            {sidebarItems.map((item, i) => {
                console.log()
                return (
                    <div key={i} className=''>
                        <Link href={item.link} className={cx('flex gap-2 px-4 py-2 hover:bg-gray-200',new URL(item.link).pathname == url ? "font-semibold bg-gray-200" : "")}>{item.icon} {item.title}</Link>
                    </div>
                );
            })}
        </aside>
    );
}
