import Sidebar from "@/components/chat/Sidebar";
import SidebarToggle from "@/components/chat/SidebarToggle";
import Messages from "@/components/chat/Messages";

function Page() {
    return (
        <>
            <Sidebar />
            <Messages />
            <SidebarToggle/>
        </>
    );
}

export default Page;
