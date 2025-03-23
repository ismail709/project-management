import DarkModeToggler from "@/components/common/DarkModeToggler";
import Header from "@/components/common/Header";
import AppLayout from "@/layouts/app-layout";


export default function Home() {
    return <div>
        <Header className="" />
        <DarkModeToggler />
    </div>
}

Home.layout = page => <AppLayout children={page} />