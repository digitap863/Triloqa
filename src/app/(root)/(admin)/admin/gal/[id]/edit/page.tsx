"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    Upload,
    X,
    Save,
    RotateCcw,
    Image as ImageIcon,
    Video
} from "lucide-react";
import { useGalleryStore } from "@/stores/galleryStore";

export default function EditGalleryPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const { fetchGalleryItemById, updateGalleryItem, loading } = useGalleryStore();

    const [mediaType, setMediaType] = useState<"image" | "video">("image");

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "Installation",
        tags: "",
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!id || isLoaded) return;
        const load = async () => {
            const item = await fetchGalleryItemById(id);
            if (item) {
                const type = item.mediaType || "image";
                setMediaType(type);
                setFormData({
                    title: item.title,
                    category: item.category,
                    tags: item.tags.join(", "),
                });
                if (type === "image") {
                    setImagePreview(item.image || null);
                } else {
                    setVideoPreview(item.video || null);
                }
                setIsLoaded(true);
            }
        };
        load();
    }, [id, fetchGalleryItemById, isLoaded]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoPreview(url);
        }
    };

    const removeMedia = () => {
        setImagePreview(null);
        setImageFile(null);
        setVideoPreview(null);
        setVideoFile(null);
    };

    const switchMediaType = (type: "image" | "video") => {
        setMediaType(type);
        removeMedia();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("tags", formData.tags);
            data.append("mediaType", mediaType);
            if (imageFile) data.append("image", imageFile);
            if (videoFile) data.append("video", videoFile);

            await updateGalleryItem(id, data);
            alert("Updated successfully!");
            router.push("/admin/gal");
        } catch (error) {
            console.error(error);
            alert("Update failed.");
        }
    };

    const categories = [
        "Installation",
        "Commercial",
        "Equipment",
        "Field Work",
        "Maintenance",
    ];

    return (
        <div className="min-h-screen bg-[#F9FBFC] font-sans pb-20">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/gal"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e]">Edit Media</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                                Gallery Asset ID: {id?.slice(-6)}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-[#1D8F2C] text-white text-sm font-bold rounded flex items-center gap-2 hover:bg-green-700 transition-all shadow-sm shadow-green-200 disabled:opacity-50"
                    >
                        <Save size={16} />
                        {loading ? "Saving..." : "Update Changes"}
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* ─── LEFT: FORM FIELDS ─── */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                                    Project Title
                                </label>
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
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#1D8F2C] text-sm font-semibold"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                                    Tags (comma separated)
                                </label>
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

                    {/* ─── RIGHT: MEDIA ─── */}
                    <div className="space-y-6">

                        {/* Media Type Toggle */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                Media Type
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => switchMediaType("image")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold border-2 transition-all ${
                                        mediaType === "image"
                                            ? "border-[#1D8F2C] bg-green-50 text-[#1D8F2C]"
                                            : "border-gray-200 text-gray-400 hover:border-gray-300"
                                    }`}
                                >
                                    <ImageIcon size={16} />
                                    Image
                                </button>
                                <button
                                    type="button"
                                    onClick={() => switchMediaType("video")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold border-2 transition-all ${
                                        mediaType === "video"
                                            ? "border-[#1D8F2C] bg-green-50 text-[#1D8F2C]"
                                            : "border-gray-200 text-gray-400 hover:border-gray-300"
                                    }`}
                                >
                                    <Video size={16} />
                                    Video
                                </button>
                            </div>
                        </div>

                        {/* Media Preview */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                {mediaType === "image" ? "Project Image" : "Project Video"}
                            </h3>

                            {/* IMAGE */}
                            {mediaType === "image" && (
                                <div
                                    className="relative w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 group"
                                    style={{ aspectRatio: "1" }}
                                >
                                    {imagePreview ? (
                                        <>
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <label className="p-2 bg-white text-gray-700 rounded-full cursor-pointer hover:bg-gray-100 transition-all">
                                                    <RotateCcw size={18} />
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={removeMedia}
                                                    className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50 transition-all"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50">
                                            <Upload size={24} className="text-gray-300 mb-2" />
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                                                Upload Image
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            )}

                            {/* VIDEO */}
                            {mediaType === "video" && (
                                <div
                                    className="relative w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 group"
                                    style={{ aspectRatio: "16/9" }}
                                >
                                    {videoPreview ? (
                                        <>
                                            <video
                                                src={videoPreview}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                            <div className="absolute top-2 right-2 flex gap-2 z-10">
                                                <label className="p-2 bg-black/50 text-white rounded-full cursor-pointer hover:bg-black/70 transition-all backdrop-blur-sm">
                                                    <RotateCcw size={16} />
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="video/*"
                                                        onChange={handleVideoChange}
                                                    />
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={removeMedia}
                                                    className="p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-all backdrop-blur-sm"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50">
                                            <Video size={28} className="text-gray-300 mb-2" />
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                                                Upload Video
                                            </span>
                                            <p className="text-[10px] text-gray-400 mt-1">MP4, MOV, WEBM</p>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="video/*"
                                                onChange={handleVideoChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
