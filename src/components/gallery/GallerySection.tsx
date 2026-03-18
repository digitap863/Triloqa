"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserGalleryStore, GalleryItem } from "@/stores/user/galleryStore";
import { X, Plus, Play } from "lucide-react";

const GallerySection = () => {
    const { galleryItems, loading, fetchGallery } = useUserGalleryStore();
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    useEffect(() => {
        fetchGallery();
    }, [fetchGallery]);

    const openLightbox = (item: GalleryItem) => {
        setSelectedItem(item);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedItem(null);
        document.body.style.overflow = "auto";
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                {/* Header Section */}
                <div className="mb-10 sm:mb-12 text-center" data-aos="fade-up">
                    <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] leading-tight">
                        Transforming Energy For <br className="hidden sm:block" />
                        A Brighter Future
                    </h2>
                </div>

                {/* Gallery Grid */}
                {loading && galleryItems.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1d8f2c]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                        {galleryItems.map((item, index) => (
                            <div
                                key={item._id}
                                data-aos="fade-up"
                                data-aos-delay={(index % 3) * 150}
                                className="group relative border border-gray-200 p-4 sm:p-5 transition-shadow hover:shadow-lg cursor-pointer"
                                onClick={() => openLightbox(item)}
                            >
                                <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden bg-gray-900">

                                    {/* VIDEO card */}
                                    {item.mediaType === "video" ? (
                                        <>
                                            <video
                                                src={item.video}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                muted
                                                preload="metadata"
                                            />
                                            {/* Play button overlay */}
                                            <div className="absolute inset-0 bg-[#232434]/30 group-hover:bg-[#232434]/50 transition-colors duration-300 flex items-center justify-center">
                                                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <Play size={26} className="text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* IMAGE card */}
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Zoom Icon on Hover */}
                                            <div className="absolute inset-0 bg-[#232434]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-[#1d8f2c] text-white flex items-center justify-center">
                                                    <Plus size={24} />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Category Tag */}
                                    <span className="absolute top-3 left-3 bg-white px-3 py-1.5 text-xs font-semibold text-[#232434] uppercase tracking-wider z-10">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="mt-4 lg:mt-5">
                                    <h3 className="text-lg font-bold text-[#232434] leading-tight group-hover:text-[#1d8f2c] transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.tags && item.tags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {item.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-[#585858] text-[10px] uppercase font-bold tracking-widest"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {galleryItems.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No gallery items available at the moment.</p>
                    </div>
                )}
            </div>

            {/* ─── LIGHTBOX MODAL ─── */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#232434]/95 p-4 md:p-10"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-[#1d8f2c] transition-colors p-2 z-10"
                        onClick={closeLightbox}
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedItem.mediaType === "video" ? (
                            <video
                                src={selectedItem.video}
                                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                                controls
                                autoPlay
                            />
                        ) : (
                            <div className="relative w-full h-full" style={{ minHeight: "60vh" }}>
                                <Image
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default GallerySection;
