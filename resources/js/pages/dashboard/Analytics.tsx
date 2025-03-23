import DashboardLayout from "@/layouts/dashboard-layout"


export default function Analytics({tasks}){
    console.log(tasks)
    return <>Analytics</>
}


Analytics.layout = page => <DashboardLayout children={page} />