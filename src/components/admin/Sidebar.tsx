"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    Wrench,
    BookOpen,
    Images,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const navItems = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Services",
        href: "/admin/services",
        icon: Wrench,
    },
    {
        label: "Blogs",
        href: "/admin/blogs",
        icon: BookOpen,
    },
    {
        label: "Gallery",
        href: "/admin/gal",
        icon: Images,
    },
];

interface SidebarProps {
    /** Force sidebar to stay open (e.g. on a desktop layout wrapper) */
    alwaysOpen?: boolean;
}

const Sidebar = ({ alwaysOpen = false }: SidebarProps) => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logout, loading } = useAuthStore();

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    /* ─── Shared nav list ─── */
    const NavList = ({ onClose }: { onClose?: () => void }) => (
        <nav className="flex flex-col flex-1 overflow-y-auto py-4">
            {navItems.map(({ label, href, icon: Icon }) => {
                const active = isActive(href);
                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        className={`
              group flex items-center justify-between px-5 py-3.5 mx-3 mb-1
              transition-all duration-200
              ${active
                                ? "bg-[#1D8F2C] text-white"
                                : "text-white/60 hover:bg-white/5 hover:text-white"
                            }
            `}
                    >
                        <span className="flex items-center gap-3">
                            <Icon
                                size={18}
                                className={active ? "text-white" : "text-[#1D8F2C] group-hover:text-white transition-colors"}
                            />
                            <span className="text-[14px] font-semibold tracking-wide">
                                {label}
                            </span>
                        </span>
                        <ChevronRight
                            size={14}
                            className={`shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                        />
                    </Link>
                );
            })}
        </nav>
    );

    /* ─── Sidebar inner content ─── */
    const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
        <div className="flex flex-col h-full bg-[#0E171A]">
            {/* Top accent bar */}
            <div className="h-1 bg-[#1D8F2C] shrink-0" />

            {/* Logo + close (mobile) */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10 shrink-0">
                <Link href="/" onClick={onClose} className="flex items-center gap-2">
                    <Image
                        src="/logo1.png"
                        width={100}
                        height={46}
                        alt="Triloqa"
                        className="brightness-0 invert"
                    />
                </Link>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Admin badge */}
            {/* <div className="px-5 py-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3 bg-white/4 px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1D8F2C]/20 border border-dashed border-[#1D8F2C] flex items-center justify-center shrink-0">
                        <ShieldCheck size={15} className="text-[#1D8F2C]" />
                    </div>
                    <div>
                        <p className="text-white text-[13px] font-semibold leading-none">
                            Administrator
                        </p>
                        <p className="text-white/35 text-[11px] mt-0.5">
                            admin@triloqa.com
                        </p>
                    </div>
                </div>
            </div> */}

            {/* Section label */}
            <div className="px-5 pt-5 pb-1 shrink-0">
                <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">
                    Main Menu
                </p>
            </div>

            {/* Nav items */}
            <NavList onClose={onClose} />

            {/* Bottom divider + logout */}
            <div className="border-t border-white/10 px-5 py-5 shrink-0">
                <button
                    className="flex items-center gap-3 text-white/40 hover:text-red-400 transition-colors w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={logout}
                    disabled={loading}
                >
                    <LogOut size={17} className="group-hover:text-red-400 transition-colors" />
                    <span className="text-[13px] font-semibold">
                        {loading ? "Signing out…" : "Sign Out"}
                    </span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* ─── DESKTOP SIDEBAR ─── */}
            <aside
                className={`hidden lg:flex flex-col w-[240px] shrink-0 h-screen sticky top-0 ${alwaysOpen ? "flex" : ""
                    }`}
                style={{
                    backgroundImage:
                        "linear-gradient(#1D8F2C08 1px, transparent 1px), linear-gradient(90deg, #1D8F2C08 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            >
                <SidebarContent />
            </aside>

            {/* ─── MOBILE HAMBURGER TRIGGER ─── */}
            <button
                className="fixed top-4 left-4 z-50 lg:hidden bg-[#1D8F2C] text-white p-2.5 shadow-lg"
                onClick={() => setMobileOpen(true)}
                aria-label="Open admin menu"
            >
                <Menu size={20} />
            </button>

            {/* ─── MOBILE BACKDROP ─── */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ─── MOBILE SLIDE-IN PANEL ─── */}
            <div
                className={`
          fixed top-0 left-0 h-full w-[260px] z-50 lg:hidden
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <SidebarContent onClose={() => setMobileOpen(false)} />
            </div>
        </>
    );
};

export default Sidebar;
