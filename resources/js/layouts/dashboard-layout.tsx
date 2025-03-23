import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";

export default function DashboardLayout({ children }) {
    return (
        <div className="grid grid-rows-[60px_1fr] font-poppins h-screen">
            <div className="">
                <Header />
            </div>
            <div className="grid grid-cols-[250px_1fr]">
                <div className="flex">
                    <SideBar />
                </div>
                <main className="flex max-h-[calc(100vh-60px)]">{children}</main>
            </div>
        </div>
    );
}
