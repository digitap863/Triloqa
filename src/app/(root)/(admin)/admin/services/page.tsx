"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
    Layers,
    Plus,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ImageIcon,
    Loader2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useServiceStore } from "@/stores/serviceStore";
import { useSubServiceStore, SubServiceItem } from "@/stores/subServiceStore";

const ITEMS_PER_PAGE = 5;

export default function AdminServicesPage() {
    const [page, setPage] = useState(1);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    // Map of serviceId -> sub-services array
    const [subServicesMap, setSubServicesMap] = useState<Record<string, SubServiceItem[]>>({});
    const [subLoadingId, setSubLoadingId] = useState<string | null>(null);

    const { services, pagination, loading, fetchServices, deleteService } = useServiceStore();
    const { fetchSubServices, deleteSubService } = useSubServiceStore();

    useEffect(() => {
        fetchServices({ page, limit: ITEMS_PER_PAGE });
    }, [page, fetchServices]);

    // After services load, fetch sub-service counts for each
    useEffect(() => {
        if (!services.length) return;
        services.forEach(async (service) => {
            if (subServicesMap[service._id] !== undefined) return; // already fetched
            try {
                const res = await fetch(`/api/admin/sub-services?parentServiceId=${service._id}&limit=100`);
                const data = await res.json();
                setSubServicesMap(prev => ({ ...prev, [service._id]: data.subServices || [] }));
            } catch {
                setSubServicesMap(prev => ({ ...prev, [service._id]: [] }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [services]);

    const handleToggleExpand = async (serviceId: string) => {
        if (expandedId === serviceId) {
            setExpandedId(null);
            return;
        }
        setExpandedId(serviceId);
        // Refresh sub-services when expanding
        setSubLoadingId(serviceId);
        try {
            const res = await fetch(`/api/admin/sub-services?parentServiceId=${serviceId}&limit=100`);
            const data = await res.json();
            setSubServicesMap(prev => ({ ...prev, [serviceId]: data.subServices || [] }));
        } catch {
            setSubServicesMap(prev => ({ ...prev, [serviceId]: [] }));
        }
        setSubLoadingId(null);
    };

    const handleDeleteService = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteService(id);
                fetchServices({ page, limit: ITEMS_PER_PAGE });
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const handleDeleteSubService = async (subId: string, parentId: string) => {
        if (confirm("Are you sure you want to delete this sub-service?")) {
            try {
                await deleteSubService(subId);
                // Refresh the sub-services list for this parent
                const res = await fetch(`/api/admin/sub-services?parentServiceId=${parentId}&limit=100`);
                const data = await res.json();
                setSubServicesMap(prev => ({ ...prev, [parentId]: data.subServices || [] }));
            } catch (error) {
                console.error("Delete sub-service failed:", error);
            }
        }
    };

    const totalItems = pagination?.total || 0;
    const totalPages = pagination?.totalPages || 1;

    return (
        <div className="min-h-screen bg-[#f4f4f4] font-sans">

            {/* ─── TOP HEADER ─── */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-7 bg-[#1D8F2C]" />
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e] leading-none">Services</h1>
                            <p className="text-xs text-gray-400 mt-0.5">Manage all your service offerings</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/services/add"
                        className="flex items-center gap-2 bg-[#1D8F2C] text-white text-sm font-semibold px-4 py-2.5 hover:bg-green-700 transition-colors"
                    >
                        <Plus size={15} />
                        New Service
                    </Link>
                </div>
            </header>

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* ─── TABLE CARD ─── */}
                <div className="bg-white shadow-sm">

                    {/* Toolbar */}
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                        <Layers size={15} className="text-[#1D8F2C]" />
                        <span className="text-sm font-bold text-[#1b1e2e] uppercase tracking-wider">All Services</span>
                        <span className="text-xs bg-[#1D8F2C]/10 text-[#1D8F2C] font-semibold px-2 py-0.5">
                            {totalItems}
                        </span>
                    </div>

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 size={30} className="animate-spin mb-4 text-[#1D8F2C]" />
                            <p className="text-sm font-medium">Loading Services...</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#f8f8f8] border-b border-gray-100">
                                            <th className="text-left px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold w-8">#</th>
                                            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Service</th>
                                            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold hidden md:table-cell">Slug</th>
                                            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold hidden xl:table-cell">Images</th>
                                            <th className="text-right px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {services.length > 0 ? (
                                            services.map((service, idx) => {
                                                const subs = subServicesMap[service._id] ?? null;
                                                const hasSubServices = subs !== null && subs.length > 0;
                                                const isExpanded = expandedId === service._id;
                                                const isSubLoading = subLoadingId === service._id;

                                                return (
                                                    <>
                                                        {/* ── Parent Service Row ── */}
                                                        <tr
                                                            key={service._id}
                                                            className="hover:bg-[#f9fdf9] transition-colors group"
                                                        >
                                                            {/* Row number */}
                                                            <td className="px-6 py-4 text-gray-300 text-xs font-mono">
                                                                {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                                                            </td>

                                                            {/* Service preview */}
                                                            <td className="px-4 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-14 h-10 shrink-0 overflow-hidden bg-gray-100 relative hidden sm:block">
                                                                        <Image
                                                                            src={service.img1}
                                                                            alt={service.title}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <p className="font-semibold text-[#1b1e2e] group-hover:text-[#1D8F2C] transition-colors line-clamp-1 text-[13px]">
                                                                            {service.title}
                                                                        </p>
                                                                        {/* Sub-service count badge */}
                                                                        {subs !== null && subs.length > 0 && (
                                                                            <span className="text-[10px] text-[#1D8F2C] font-semibold bg-green-50 px-1.5 py-0.5 rounded-sm mt-0.5 inline-block">
                                                                                {subs.length} Types{subs.length > 1 ? "s" : ""}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            {/* Slug */}
                                                            <td className="px-4 py-4 hidden md:table-cell">
                                                                <span className="text-[11px] font-mono text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1">
                                                                    /{service.slug}
                                                                </span>
                                                            </td>

                                                            {/* Images preview */}
                                                            <td className="px-4 py-4 hidden xl:table-cell">
                                                                <div className="flex items-center gap-1.5">
                                                                    {[service.img1, service.img2].map((img, i) => (
                                                                        <div key={i} className="w-8 h-8 relative overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                                                            <Image src={img} alt={`img${i + 1}`} fill className="object-cover" />
                                                                        </div>
                                                                    ))}
                                                                    <span className="text-[10px] text-gray-300 flex items-center gap-0.5 ml-0.5">
                                                                        <ImageIcon size={9} /> 2
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            {/* Actions */}
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center justify-end gap-1">
                                                                    {/* Expand/Add sub-service button */}
                                                                    {hasSubServices ? (
                                                                        <button
                                                                            onClick={() => handleToggleExpand(service._id)}
                                                                            className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors ${isExpanded ? "bg-[#1D8F2C] text-white" : "text-[#1D8F2C] border border-[#1D8F2C] hover:bg-green-50"}`}
                                                                            title="View Sub-Services"
                                                                        >
                                                                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                                        </button>
                                                                    ) : (
                                                                        <Link
                                                                            href={`/admin/services/${service._id}/sub-services/add`}
                                                                            className="w-8 h-8 flex items-center justify-center text-white bg-[#1D8F2C] hover:bg-green-700 transition-colors rounded-sm"
                                                                            title="Add Sub-Service"
                                                                        >
                                                                            <Plus size={14} />
                                                                        </Link>
                                                                    )}

                                                                    {/* View */}
                                                                    <Link
                                                                        href={`/services/${service.slug}`}
                                                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1D8F2C] hover:bg-[#1D8F2C]/10 transition-colors"
                                                                        title="View"
                                                                    >
                                                                        <Eye size={14} />
                                                                    </Link>
                                                                    {/* Edit */}
                                                                    <Link
                                                                        href={`/admin/services/${service._id}/edit`}
                                                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1b1e2e] hover:bg-gray-100 transition-colors"
                                                                        title="Edit"
                                                                    >
                                                                        <Pencil size={14} />
                                                                    </Link>
                                                                    {/* Delete */}
                                                                    <button
                                                                        onClick={() => handleDeleteService(service._id)}
                                                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        {/* ── Expanded Sub-Services Panel ── */}
                                                        {isExpanded && (
                                                            <tr key={`${service._id}-sub`} className="bg-[#f9fdf9]">
                                                                <td colSpan={5} className="px-0 py-0">
                                                                    <div className="border-l-4 border-[#1D8F2C] ml-6 my-2 bg-white shadow-sm">

                                                                        {/* Sub-panel header */}
                                                                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                                                                            <div className="flex items-center gap-2">
                                                                                <Layers size={13} className="text-[#1D8F2C]" />
                                                                                <span className="text-xs font-bold text-[#1b1e2e] uppercase tracking-wider">
                                                                                    Types
                                                                                </span>
                                                                                <span className="text-[10px] bg-[#1D8F2C]/10 text-[#1D8F2C] font-bold px-1.5 py-0.5 rounded-sm">
                                                                                    {subs?.length}
                                                                                </span>
                                                                            </div>
                                                                            <Link
                                                                                href={`/admin/services/${service._id}/sub-services/add`}
                                                                                className="flex items-center gap-1 text-xs text-[#1D8F2C] font-semibold hover:underline"
                                                                            >
                                                                                <Plus size={11} /> Add New
                                                                            </Link>
                                                                        </div>

                                                                        {isSubLoading ? (
                                                                            <div className="py-6 flex justify-center">
                                                                                <Loader2 size={18} className="animate-spin text-[#1D8F2C]" />
                                                                            </div>
                                                                        ) : (
                                                                            <table className="w-full text-sm">
                                                                                <thead>
                                                                                    <tr className="bg-gray-50 border-b border-gray-100">
                                                                                        <th className="text-left px-5 py-2 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Sub-Service</th>
                                                                                        <th className="text-left px-4 py-2 text-[10px] uppercase tracking-widest text-gray-400 font-semibold hidden md:table-cell">Slug</th>
                                                                                        <th className="text-right px-5 py-2 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Actions</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="divide-y divide-gray-50">
                                                                                    {subs?.map((sub) => (
                                                                                        <tr key={sub._id} className="hover:bg-green-50/30 transition-colors group/sub">
                                                                                            {/* Sub-service preview */}
                                                                                            <td className="px-5 py-3">
                                                                                                <div className="flex items-center gap-3">
                                                                                                    <div className="w-10 h-8 shrink-0 overflow-hidden bg-gray-100 relative">
                                                                                                        <Image
                                                                                                            src={sub.img}
                                                                                                            alt={sub.title}
                                                                                                            fill
                                                                                                            className="object-cover"
                                                                                                        />
                                                                                                    </div>
                                                                                                    <p className="font-medium text-[#1b1e2e] line-clamp-1 text-[12px] group-hover/sub:text-[#1D8F2C] transition-colors">
                                                                                                        {sub.title}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </td>

                                                                                            {/* Slug */}
                                                                                            <td className="px-4 py-3 hidden md:table-cell">
                                                                                                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5">
                                                                                                    /{sub.slug}
                                                                                                </span>
                                                                                            </td>

                                                                                            {/* Actions */}
                                                                                            <td className="px-5 py-3">
                                                                                                <div className="flex items-center justify-end gap-1">
                                                                                                    <Link
                                                                                                        href={`/services/${sub.slug}`}
                                                                                                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-[#1D8F2C] hover:bg-[#1D8F2C]/10 transition-colors rounded-sm"
                                                                                                        title="View"
                                                                                                    >
                                                                                                        <Eye size={13} />
                                                                                                    </Link>
                                                                                                    <Link
                                                                                                        href={`/admin/sub-services/${sub._id}/edit`}
                                                                                                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-[#1b1e2e] hover:bg-gray-100 transition-colors rounded-sm"
                                                                                                        title="Edit"
                                                                                                    >
                                                                                                        <Pencil size={13} />
                                                                                                    </Link>
                                                                                                    <button
                                                                                                        onClick={() => handleDeleteSubService(sub._id, service._id)}
                                                                                                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-sm"
                                                                                                        title="Delete"
                                                                                                    >
                                                                                                        <Trash2 size={13} />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-16 text-center">
                                                    <Layers size={40} className="mx-auto text-gray-200 mb-3" />
                                                    <p className="text-sm text-gray-400 font-medium">No services found.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* ─── PAGINATION ─── */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-400">
                                        Showing{" "}
                                        <span className="font-semibold text-[#1b1e2e]">
                                            {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, totalItems)}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-[#1b1e2e]">{totalItems}</span> results
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#1D8F2C] hover:text-[#1D8F2C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronLeft size={14} />
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={`w-8 h-8 text-xs font-semibold border transition-colors ${p === page ? "bg-[#1D8F2C] text-white border-[#1D8F2C]" : "border-gray-200 text-gray-500 hover:border-[#1D8F2C] hover:text-[#1D8F2C]"}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#1D8F2C] hover:text-[#1D8F2C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
