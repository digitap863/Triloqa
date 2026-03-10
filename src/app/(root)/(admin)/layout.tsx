"use client"
import Sidebar from "@/components/admin/Sidebar";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    // Hide sidebar on login page
    const showSidebar = pathname !== "/admin/login";
    return (
        <div className="flex min-h-screen bg-[#f4f4f4] font-sans">
            {/* Sidebar */}
            {showSidebar && <Sidebar />}

            {/* Main content area */}
            <main className="flex-1 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
