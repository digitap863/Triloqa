"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    Layers,
    Plus,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ImageIcon,
    Loader2
} from "lucide-react";
import { useServiceStore } from "@/stores/serviceStore";

const ITEMS_PER_PAGE = 5;

export default function AdminServicesPage() {
    const [page, setPage] = useState(1);

    const { services, pagination, loading, fetchServices, deleteService } = useServiceStore();

    useEffect(() => {
        fetchServices({ page, limit: ITEMS_PER_PAGE });
    }, [page, fetchServices]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteService(id);
                fetchServices({ page, limit: ITEMS_PER_PAGE });
            } catch (error) {
                console.error("Delete failed:", error);
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
                            <h1 className="text-lg font-bold text-[#1b1e2e] leading-none">
                                Services
                            </h1>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Manage all your service offerings
                            </p>
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

                    {/* Table toolbar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Layers size={15} className="text-[#1D8F2C]" />
                            <span className="text-sm font-bold text-[#1b1e2e] uppercase tracking-wider">
                                All Services
                            </span>
                            <span className="text-xs bg-[#1D8F2C]/10 text-[#1D8F2C] font-semibold px-2 py-0.5">
                                {totalItems}
                            </span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 size={30} className="animate-spin mb-4 text-[#1D8F2C]" />
                            <p className="text-sm font-medium">Loading Services...</p>
                        </div>
                    ) : (
                        <>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#f8f8f8] border-b border-gray-100">
                                            <th className="text-left px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold w-8">
                                                #
                                            </th>
                                            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                                                Service
                                            </th>
                                            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold hidden md:table-cell">
                                                Slug
                                            </th>
                                            <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold hidden xl:table-cell">
                                                Images
                                            </th>
                                            <th className="text-right px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {services.length > 0 ? (
                                            services.map((service, idx) => (
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
                                                                <div
                                                                    key={i}
                                                                    className="w-8 h-8 relative overflow-hidden bg-gray-100 shrink-0 border border-gray-200"
                                                                >
                                                                    <Image
                                                                        src={img}
                                                                        alt={`img${i + 1}`}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
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
                                                            <Link
                                                                href={`/services/${service.slug}`}
                                                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1D8F2C] hover:bg-[#1D8F2C]/10 transition-colors"
                                                                title="View"
                                                            >
                                                                <Eye size={14} />
                                                            </Link>
                                                            <Link
                                                                href={`/admin/services/${service._id}/edit`}
                                                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1b1e2e] hover:bg-gray-100 transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Pencil size={14} />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(service._id)}
                                                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-16 text-center">
                                                    <Layers size={40} className="mx-auto text-gray-200 mb-3" />
                                                    <p className="text-sm text-gray-400 font-medium">
                                                        No services found.
                                                    </p>
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
                                            {(page - 1) * ITEMS_PER_PAGE + 1}–
                                            {Math.min(page * ITEMS_PER_PAGE, totalItems)}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-[#1b1e2e]">
                                            {totalItems}
                                        </span>{" "}
                                        results
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
                                                className={`w-8 h-8 text-xs font-semibold border transition-colors ${p === page
                                                    ? "bg-[#1D8F2C] text-white border-[#1D8F2C]"
                                                    : "border-gray-200 text-gray-500 hover:border-[#1D8F2C] hover:text-[#1D8F2C]"
                                                    }`}
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
