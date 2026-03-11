"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    Images,
    Plus,
    Trash2,
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
    List,
    Calendar,
    Tag,
    Pencil,
    Loader2
} from "lucide-react";
import { useGalleryStore } from "@/stores/galleryStore";

const ITEMS_PER_PAGE = 6;

export default function AdminGalleryPage() {
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

    const {
        galleryItems,
        pagination,
        loading,
        fetchGallery,
        deleteGalleryItem
    } = useGalleryStore();

    useEffect(() => {
        fetchGallery({ page, limit: ITEMS_PER_PAGE });
    }, [page, fetchGallery]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this gallery item?")) {
            try {
                await deleteGalleryItem(id);
                // Refresh current page
                fetchGallery({ page, limit: ITEMS_PER_PAGE });
            } catch (error) {
                console.error("Delete failed", error);
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
                                Gallery
                            </h1>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Manage all uploaded images and media
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/admin/gal/add"
                        className="flex items-center gap-2 bg-[#1D8F2C] text-white text-sm font-semibold px-4 py-2.5 hover:bg-green-700 transition-colors"
                    >
                        <Plus size={15} />
                        Upload Image
                    </Link>
                </div>
            </header>

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* ─── MAIN CARD ─── */}
                <div className="bg-white shadow-sm">

                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Images size={15} className="text-[#1D8F2C]" />
                            <span className="text-sm font-bold text-[#1b1e2e] uppercase tracking-wider">
                                All Images
                            </span>
                            <span className="text-xs bg-[#1D8F2C]/10 text-[#1D8F2C] font-semibold px-2 py-0.5">
                                {totalItems}
                            </span>
                        </div>

                        {/* View toggle */}
                        <div className="flex border border-gray-200">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "grid"
                                    ? "bg-[#1D8F2C] text-white"
                                    : "text-gray-400 hover:text-[#1D8F2C]"
                                    }`}
                                title="Grid view"
                            >
                                <LayoutGrid size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode("table")}
                                className={`w-9 h-9 flex items-center justify-center transition-colors border-l border-gray-200 ${viewMode === "table"
                                    ? "bg-[#1D8F2C] text-white"
                                    : "text-gray-400 hover:text-[#1D8F2C]"
                                    }`}
                                title="Table view"
                            >
                                <List size={14} />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 size={30} className="animate-spin mb-4 text-[#1D8F2C]" />
                            <p className="text-sm font-medium">Loading Gallery...</p>
                        </div>
                    ) : (
                        <>
                            {/* ─── GRID VIEW ─── */}
                            {viewMode === "grid" && (
                                <div className="p-6">
                                    {galleryItems.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {galleryItems.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="group relative bg-[#f8f8f8] overflow-hidden border border-gray-100 hover:border-[#1D8F2C]/30 transition-colors"
                                                >
                                                    {/* Image */}
                                                    <div className="relative w-full h-44 overflow-hidden">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        {/* Overlay on hover */}
                                                        <div className="absolute inset-0 bg-[#1b1e2e]/0 group-hover:bg-[#1b1e2e]/40 transition-colors duration-300 flex items-center justify-center gap-2">
                                                            <Link
                                                                href={`/admin/gal/${item._id}/edit`}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 bg-white flex items-center justify-center text-[#1b1e2e] hover:bg-[#1D8F2C] hover:text-white transition-colors"
                                                            >
                                                                <Pencil size={14} />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(item._id)}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 bg-white flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Info */}
                                                    <div className="p-3">
                                                        <p className="text-[13px] font-semibold text-[#1b1e2e] line-clamp-1">
                                                            {item.title}
                                                        </p>
                                                        <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1.5">
                                                            <Calendar size={9} />
                                                            {item.date}
                                                        </span>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {item.tags.slice(0, 2).map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-[9px] text-gray-400 border border-gray-200 px-1.5 py-0.5 flex items-center gap-0.5"
                                                                >
                                                                    <Tag size={7} />
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {item.tags.length > 2 && (
                                                                <span className="text-[9px] text-gray-400 border border-dashed border-gray-200 px-1.5 py-0.5">
                                                                    +{item.tags.length - 2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center">
                                            <Images size={40} className="mx-auto text-gray-200 mb-3" />
                                            <p className="text-sm text-gray-400 font-medium">
                                                No images found.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ─── TABLE VIEW ─── */}
                            {viewMode === "table" && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-[#f8f8f8] border-b border-gray-100">
                                                <th className="text-left px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold w-8">
                                                    #
                                                </th>
                                                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                                                    Image
                                                </th>

                                                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold hidden lg:table-cell">
                                                    Date
                                                </th>
                                                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold hidden lg:table-cell">
                                                    Tags
                                                </th>
                                                <th className="text-right px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {galleryItems.length > 0 ? (
                                                galleryItems.map((item, idx) => (
                                                    <tr
                                                        key={item._id}
                                                        className="hover:bg-[#f9fdf9] transition-colors group"
                                                    >
                                                        {/* Row number */}
                                                        <td className="px-6 py-4 text-gray-300 text-xs font-mono">
                                                            {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                                                        </td>

                                                        {/* Image + title */}
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-16 h-11 shrink-0 overflow-hidden bg-gray-100 relative">
                                                                    <Image
                                                                        src={item.image}
                                                                        alt={item.title}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <p className="font-semibold text-[#1b1e2e] group-hover:text-[#1D8F2C] transition-colors line-clamp-1 text-[13px]">
                                                                    {item.title}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* Date */}
                                                        <td className="px-4 py-4 hidden lg:table-cell">
                                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Calendar size={10} className="text-gray-300" />
                                                                {item.date}
                                                            </span>
                                                        </td>

                                                        {/* Tags */}
                                                        <td className="px-4 py-4 hidden lg:table-cell">
                                                            <div className="flex flex-wrap gap-1">
                                                                {item.tags.slice(0, 2).map((tag) => (
                                                                    <span
                                                                        key={tag}
                                                                        className="text-[10px] text-gray-400 border border-gray-200 px-1.5 py-0.5 flex items-center gap-0.5"
                                                                    >
                                                                        <Tag size={8} />
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                                {item.tags.length > 2 && (
                                                                    <span className="text-[10px] text-gray-400 border border-dashed border-gray-200 px-1.5 py-0.5">
                                                                        +{item.tags.length - 2}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Actions */}
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <Link
                                                                    href={`/admin/gal/${item._id}/edit`}
                                                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1b1e2e] hover:bg-gray-100 transition-colors"
                                                                    title="Edit"
                                                                >
                                                                    <Pencil size={14} />
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDelete(item._id)}
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
                                                    <td colSpan={6} className="px-6 py-16 text-center">
                                                        <Images size={40} className="mx-auto text-gray-200 mb-3" />
                                                        <p className="text-sm text-gray-400 font-medium">
                                                            No images found.
                                                        </p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

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
