"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, X, Save, RotateCcw } from "lucide-react";
import { useGalleryStore } from "@/stores/galleryStore";

export default function EditGalleryPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const { fetchGalleryItemById, updateGalleryItem, loading } = useGalleryStore();

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "RESIDENTIAL",
        tags: "",
    });

    useEffect(() => {
        const load = async () => {
            const item = await fetchGalleryItemById(id);
            if (item) {
                setFormData({
                    title: item.title,
                    category: item.category,
                    tags: item.tags.join(", "),
                });
                setImagePreview(item.image);
            }
        };
        load();
    }, [id, fetchGalleryItemById]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("tags", formData.tags);
            if (imageFile) data.append("image", imageFile);

            await updateGalleryItem(id, data);
            alert("Updated successfully!");
            router.push("/admin/gal");
        } catch (error) {
            console.error(error);
            alert("Update failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FBFC] font-sans pb-20">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/gal" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e]">Edit Item</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Gallery Asset ID: {id.slice(-6)}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-[#1D8F2C] text-white text-sm font-bold rounded flex items-center gap-2 hover:bg-green-700 transition-all shadow-sm shadow-green-200"
                    >
                        <Save size={16} />
                        {loading ? "Saving..." : "Update Changes"}
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Project Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#1D8F2C] text-sm font-semibold"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#1D8F2C] text-sm font-semibold"
                                >
                                    <option value="RESIDENTIAL">Residential</option>
                                    <option value="COMMERCIAL">Commercial</option>
                                    <option value="INDUSTRIAL">Industrial</option>
                                    <option value="UTILITY">Utility Scale</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#1D8F2C] text-sm font-semibold"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Project Image</h3>
                            <div className="relative aspect-square w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 group">
                                {imagePreview ? (
                                    <>
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <label className="p-2 bg-white text-gray-700 rounded-full cursor-pointer hover:bg-gray-100 transition-all">
                                                <RotateCcw size={18} />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50">
                                        <Upload size={24} className="text-gray-300 mb-2" />
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Upload Image</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
