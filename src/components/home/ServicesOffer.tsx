"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUserServiceStore } from "@/stores/user/serviceStore";
import { useUserSubServiceStore } from "@/stores/user/subServiceStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

const ServicesOffer = () => {
    const { services, loading, fetchServices } = useUserServiceStore();
    const { subServices, fetchSubServices } = useUserSubServiceStore();
    const swiperRef = useRef<SwiperType>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        fetchServices({ limit: 8 });
        fetchSubServices();
    }, [fetchServices, fetchSubServices]);

    const handleSlideChange = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    if (loading && services.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1d8f2c]"></div>
            </div>
        );
    }

    return (
        <section className="w-full h-screen flex items-center relative py-16 lg:py-0 lg:h-screen overflow-hidden font-sans">
            <Image src="/images/home/sbg.jpg" alt="bg" fill className="object-cover" />

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-10">
                    <div data-aos="fade-right">
                        <p className="text-[#1d8f2c] uppercase font-semibold tracking-wide text-sm sm:text-base">
                            Services We Offer
                        </p>
                        <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-900 leading-tight">
                            Provide Comprehensive Ecological <br className="hidden sm:block" />
                            Service
                        </h2>
                    </div>

                    {/* ARROWS */}
                    <div data-aos="fade-left" className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            disabled={isBeginning}
                            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#1d8f2c] flex items-center justify-center text-[#1d8f2c] transition-all 
                                ${isBeginning ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#1d8f2c] hover:text-white cursor-pointer'}`}
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            disabled={isEnd}
                            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#1d8f2c] text-white flex items-center justify-center transition-all 
                                ${isEnd ? 'opacity-30 cursor-not-allowed' : 'hover:bg-green-700 cursor-pointer'}`}
                        >
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* CARDS (SWIPER) */}
                <div data-aos="fade-up" data-aos-delay="200" className="mt-8 lg:mt-10">
                    <Swiper
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
                        onInit={handleSlideChange}
                        onSlideChange={handleSlideChange}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        style={{ alignItems: "stretch" }}
                        className="mySwiper"
                    >
                        {services.map((item, index) => {
                            const relatedSubServices = subServices.filter(
                                (sub) => sub.parentServiceId === item._id
                            );
                            const hasSubServices = relatedSubServices.length > 0;

                            return (
                                <SwiperSlide key={item._id || index} style={{ height: "auto" }}>
                                    <div className="bg-white border border-gray-200 flex flex-col h-full hover:shadow-md transition">

                                        {/* Image */}
                                        <div className="relative h-[200px] overflow-hidden shrink-0">
                                            <Image
                                                src={item.img1 || "/images/about/b.jpg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
                                            <h3 className="text-lg lg:text-xl font-semibold text-[#232434] line-clamp-1">
                                                {item.title}
                                            </h3>

                                            {/* Description — hidden when sub-services exist */}
                                            {!hasSubServices && (
                                                <p className="mt-3 text-gray-500 text-sm lg:text-base leading-relaxed line-clamp-3">
                                                    {(item.description || "").replace(/<[^>]*>/g, "")}
                                                </p>
                                            )}

                                            {/* Sub Services */}
                                            {hasSubServices && (
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                        Types
                                                    </p>
                                                    <ul className="space-y-1.5">
                                                        {relatedSubServices.map((sub) => (
                                                            <li key={sub._id}>
                                                                <Link
                                                                    href={`/services/${item.slug}/${sub.slug}`}
                                                                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1d8f2c] transition-colors group"
                                                                >
                                                                    <ChevronRight
                                                                        size={13}
                                                                        className="text-[#1d8f2c] shrink-0 group-hover:translate-x-0.5 transition-transform"
                                                                    />
                                                                    <span className="line-clamp-1">{sub.title}</span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="mt-auto pt-4">
                                                <Link
                                                    href={`/services/${item.slug}`}
                                                    className="inline-block text-[#1d8f2c] font-medium hover:underline text-sm lg:text-base"
                                                >
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                {/* BOTTOM LINK */}
                <div className="mt-8 lg:mt-10 text-center">
                    <span className="text-gray-800 font-medium text-sm sm:text-base">
                        Triloqa.{" "}
                        <Link href="/services" className="text-green-600 underline">
                            View All Services
                        </Link>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default ServicesOffer;
