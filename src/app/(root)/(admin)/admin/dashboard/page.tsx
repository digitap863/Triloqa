"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Wrench,
    BookOpen,
    Images,
    MessageSquare,
    TrendingUp,
    ArrowRight,
    Eye,
    Plus,
    Activity,
    CheckCircle2,
    Clock,
} from "lucide-react";

/* ─── Stat card data ─── */
const stats = [
    {
        label: "Total Services",
        value: "0",
        change: "+0 this month",
        icon: Wrench,
        href: "/admin/services",
        accent: "#1D8F2C",
    },
    {
        label: "Published Blogs",
        value: "0",
        change: "+0 this month",
        icon: BookOpen,
        href: "/admin/blogs",
        accent: "#1b1e2e",
    },
    {
        label: "Gallery Items",
        value: "0",
        change: "+0 this month",
        icon: Images,
        href: "/admin/gal",
        accent: "#1D8F2C",
    },
];

/* ─── Quick actions ─── */
const quickActions = [
    { label: "Add New Service", href: "/admin/services/add", icon: Wrench },
    { label: "Write New Blog", href: "/admin/blogs/add", icon: BookOpen },
    { label: "Upload to Gallery", href: "/admin/gal/add", icon: Images },
];

/* ─── Recent activity (dummy) ─── */
const recentActivity: any[] = [];

/* ─── Nav shortcuts ─── */
import { useEffect } from "react";
import { useServiceStore } from "@/stores/serviceStore";
import { useBlogStore } from "@/stores/blogStore";
import { useGalleryStore } from "@/stores/galleryStore";

const navShortcuts = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Services", href: "/admin/services", icon: Wrench },
    { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { label: "Gallery", href: "/admin/gal", icon: Images },
];

export default function DashboardPage() {
    const { services, fetchServices } = useServiceStore();
    const { blogs, fetchBlogs } = useBlogStore();
    const { galleryItems, fetchGallery } = useGalleryStore();

    useEffect(() => {
        fetchServices({ limit: 1 });
        fetchBlogs({ limit: 1 });
        fetchGallery({ limit: 1 });
    }, [fetchServices, fetchBlogs, fetchGallery]);

    const dynamicStats = [
        { ...stats[0], value: services.length.toString() },
        { ...stats[1], value: blogs.length.toString() },
        { ...stats[2], value: galleryItems.length.toString() },
    ];

    return (
        <div className="min-h-screen bg-[#f4f4f4] font-sans">

            {/* ─── TOP HEADER ─── */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-7 bg-[#1D8F2C]" />
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e] leading-none">
                                Admin Dashboard
                            </h1>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Welcome back, Administrator
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* View site */}
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden sm:flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-[#1D8F2C] hover:text-[#1D8F2C] transition-colors"
                        >
                            <Eye size={14} />
                            View Site
                        </Link>
                    </div>
                </div>
            </header>

            <div className="p-6 max-w-7xl mx-auto space-y-8">

                {/* ─── STATS GRID ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dynamicStats.map(({ label, value, change, icon: Icon, href, accent }) => (
                        <Link
                            key={label}
                            href={href}
                            className="group bg-white shadow-sm hover:shadow-md transition-shadow block"
                        >
                            <div className="h-1 w-full bg-[#1D8F2C]" />
                            <div className="p-5 flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                                        {label}
                                    </p>
                                    <p className="text-4xl font-bold text-[#1b1e2e]">
                                        {value}
                                    </p>
                                    <p className="text-xs text-[#1D8F2C] mt-1 font-medium flex items-center gap-1">
                                        <TrendingUp size={11} />
                                        {change}
                                    </p>
                                </div>
                                <div
                                    className="w-11 h-11 flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: accent + "15" }}
                                >
                                    <Icon size={20} style={{ color: accent }} />
                                </div>
                            </div>
                            <div className="px-5 pb-4">
                                <span className="text-xs text-gray-400 group-hover:text-[#1D8F2C] flex items-center gap-1 transition-colors">
                                    Manage <ArrowRight size={11} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ─── MIDDLE ROW ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Recent Activity (spans 2 cols) */}
                    <div className="lg:col-span-2 bg-white shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <Activity size={16} className="text-[#1D8F2C]" />
                                <h2 className="text-sm font-bold text-[#1b1e2e] uppercase tracking-wider">
                                    Recent Activity
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400">Last 7 days</span>
                        </div>

                        {recentActivity.length > 0 ? (
                            <ul className="divide-y divide-gray-50">
                                {recentActivity.map((item, i) => {
                                    const Icon = item.icon;
                                    const isDraft = item.status === "Draft";
                                    const isUnread = item.status === "Unread";
                                    return (
                                        <li
                                            key={i}
                                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-[#1D8F2C]/10 flex items-center justify-center shrink-0">
                                                    <Icon size={15} className="text-[#1D8F2C]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#1b1e2e] group-hover:text-[#1D8F2C] transition-colors">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                        <Clock size={10} />
                                                        {item.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`text-[11px] font-semibold px-2.5 py-1 uppercase tracking-wide ${isDraft
                                                    ? "bg-gray-100 text-gray-500"
                                                    : isUnread
                                                        ? "bg-red-50 text-red-500"
                                                        : "bg-[#1D8F2C]/10 text-[#1D8F2C]"
                                                    }`}
                                            >
                                                {isDraft ? <span className="flex items-center gap-1"><Clock size={10} />{item.status}</span>
                                                    : <span className="flex items-center gap-1"><CheckCircle2 size={10} />{item.status}</span>
                                                }
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <div className="p-12 text-center">
                                <Activity size={40} className="mx-auto text-gray-200 mb-3" />
                                <p className="text-sm text-gray-400 font-medium">No recent activity to show.</p>
                            </div>
                        )}
                    </div>


                    {/* Quick Actions */}
                    <div className="bg-white shadow-sm">
                        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                            <Plus size={16} className="text-[#1D8F2C]" />
                            <h2 className="text-sm font-bold text-[#1b1e2e] uppercase tracking-wider">
                                Quick Actions
                            </h2>
                        </div>

                        <div className="p-5 space-y-3">
                            {quickActions.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex items-center justify-between bg-[#f4f4f4] hover:bg-[#1D8F2C] group px-4 py-3.5 transition-colors"
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon
                                            size={16}
                                            className="text-[#1D8F2C] group-hover:text-white transition-colors"
                                        />
                                        <span className="text-sm font-semibold text-[#1b1e2e] group-hover:text-white transition-colors">
                                            {label}
                                        </span>
                                    </span>
                                    <ArrowRight
                                        size={14}
                                        className="text-gray-300 group-hover:text-white transition-colors"
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 mx-5 mb-5" />

                        {/* Nav shortcuts */}
                        <div className="px-5 pb-5 space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">
                                Jump to
                            </p>
                            {navShortcuts.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-[#1D8F2C] py-1.5 transition-colors group"
                                >
                                    <Icon size={13} className="group-hover:text-[#1D8F2C]" />
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── BOTTOM BANNER ─── */}
                <div className="bg-[#1b1e2e] relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                "linear-gradient(#1D8F2C 1px, transparent 1px), linear-gradient(90deg, #1D8F2C 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="relative z-10 px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-white font-bold text-lg">
                                Triloqa Admin Panel
                            </p>
                            <p className="text-white/40 text-sm mt-0.5">
                                Manage your website content, media, and services from one place.
                            </p>
                        </div>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 bg-[#1D8F2C] text-white text-sm font-semibold px-5 py-3 hover:bg-green-700 transition-colors shrink-0"
                        >
                            Visit Website <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}