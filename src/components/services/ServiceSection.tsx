"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useUserServiceStore } from "@/stores/user/serviceStore";
import { useUserSubServiceStore } from "@/stores/user/subServiceStore";

const ServiceSection = () => {
    const { services, loading, fetchServices } = useUserServiceStore();
    const { subServices, fetchSubServices } = useUserSubServiceStore();

    useEffect(() => {
        fetchServices();
        fetchSubServices();
    }, [fetchServices, fetchSubServices]);

    if (loading && services.length === 0) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1d8f2c]" />
            </div>
        );
    }

    return (
        <section className="w-full min-h-screen flex items-center relative overflow-hidden font-sans">
            <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">

                {/* HEADER */}
                <div className="flex items-center justify-center mb-12">
                    <div className="text-center">
                        <p data-aos="fade-up" data-aos-duration="800" className="text-[#1d8f2c] mb-4 uppercase font-semibold tracking-wide text-base">
                            Services We Offer
                        </p>
                        <h2 data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" className="text-4xl md:text-5xl font-bold text-[#1f2330]">
                            Provide Comprehensive Ecological<br /> Service
                        </h2>
                    </div>
                </div>

                {/* CARDS — 3 per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((item, index) => {
                        const relatedSubServices = subServices.filter(
                            (sub) => sub.parentServiceId === item._id
                        );
                        const hasSubServices = relatedSubServices.length > 0;

                        return (
                            <div
                                key={item._id || index}
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay={(index % 3) * 150 + 300}
                                className="border border-gray-200 flex flex-col hover:shadow-md transition h-full"
                            >
                                {/* Image */}
                                <div className="relative h-[220px] overflow-hidden">
                                    <Image
                                        src={item.img1 || "/images/about/b.jpg"}
                                        alt={item.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Icon badge overlapping bottom of image */}

                                </div>

                                {/* Content */}
                                <div className="pt-6 px-6 pb-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-semibold text-[#232434]">
                                        {item.title}
                                    </h3>

                                    {!hasSubServices && (
                                        <p className="mt-3 text-gray-500 text-base leading-relaxed line-clamp-3">
                                            {item.description?.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ").trim()}
                                        </p>
                                    )}

                                    {/* Sub Services */}
                                    {hasSubServices && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
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

                                    <Link
                                        href={`/services/${item.slug}`}
                                        className="mt-auto pt-6 text-[#1d8f2c] font-semibold hover:underline inline-block"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default ServiceSection;
