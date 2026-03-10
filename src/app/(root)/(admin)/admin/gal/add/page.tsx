"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Upload,
    X,
    Save,
    Plus,
    Calendar,
    Tag as TagIcon,
    Layers
} from "lucide-react";
import { useGalleryStore } from "@/stores/galleryStore";

export default function AddGalleryPage() {
    const router = useRouter();
    const { addGalleryItem, loading } = useGalleryStore();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "Installation",
        date: new Date().toISOString().split('T')[0],
        tags: "",
    });

    const categories = [
        "Installation",
        "Commercial",
        "Equipment",
        "Field Work",
        "Maintenance"
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !imageFile) {
            alert("Please provide at least a title and an image.");
            return;
        }

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("date", formData.date);
            data.append("tags", formData.tags);
            data.append("image", imageFile);

            await addGalleryItem(data);

            alert("Gallery item added successfully!");
            router.push("/admin/gal");
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to add gallery item. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FBFC] font-sans pb-20">
            {/* ─── NAVIGATION ─── */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/gal" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e]">Add New Media</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Gallery Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-[#1D8F2C] text-white text-sm font-bold rounded flex items-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50 shadow-sm shadow-green-200"
                        >
                            <Save size={16} />
                            {loading ? "Uploading..." : "Save Image"}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-10 lg:py-14">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* ─── LEFT: IMAGE PREVIEW ─── */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Media Preview</h3>
                            <div className="relative aspect-square w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden group bg-gray-50">
                                {imagePreview ? (
                                    <>
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50 transition-colors">
                                        <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-[#1D8F2C]">
                                            <Upload size={32} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Selected Image</span>
                                        <p className="text-[10px] text-gray-400 mt-2">Maximum file size: 5MB</p>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                )}
                            </div>
                            {imagePreview && (
                                <p className="text-[11px] text-gray-400 text-center mt-4 italic">
                                    Click the remove icon to select a different image
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ─── RIGHT: FORM DETAILS ─── */}
                    <div className="space-y-8">

                        {/* Basic Info */}
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full text-xl font-bold text-[#1b1e2e] border-b-2 border-gray-100 focus:border-[#1D8F2C] outline-none pb-2 placeholder:text-gray-200"
                                    placeholder="Residential Installation Project..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Layers size={12} className="text-[#1D8F2C]" />
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-[#1b1e2e] outline-none focus:border-[#1D8F2C] transition-all appearance-none cursor-pointer"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={12} className="text-[#1D8F2C]" />
                                        Project Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-[#1b1e2e] outline-none focus:border-[#1D8F2C] transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <TagIcon size={12} className="text-[#1D8F2C]" />
                                        Tags (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="Solar, Rooftop, 2024"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-[#1b1e2e] outline-none focus:border-[#1D8F2C] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hint Box */}
                        <div className="p-5 bg-green-50 rounded-xl border border-green-100/50 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <Plus size={20} className="text-[#1D8F2C]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-green-900 mb-1">Image Quality Tip</h4>
                                <p className="text-[11px] text-green-700 leading-relaxed">
                                    For the best results in the gallery grid, use high-resolution images with a 4:3 or 16:9 aspect ratio.
                                </p>
                            </div>
                        </div>

                    </div>
                </form>
            </main>
        </div>
    );
}
