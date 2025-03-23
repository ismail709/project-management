import DashboardLayout from "@/layouts/dashboard-layout"


export default function Meetings({tasks}){
    console.log(tasks)
    return <>Meetings</>
}


Meetings.layout = page => <DashboardLayout children={page} />