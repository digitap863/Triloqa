"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useUserServiceStore } from "@/stores/user/serviceStore";
import { useUserSubServiceStore } from "@/stores/user/subServiceStore";

/* ─── Page ─── */
const SubServiceDetailPage = () => {
    const { slug, subSlug } = useParams();

    /* ── Parent service (for name, breadcrumb, _id) ── */
    const { currentService: service, loading: serviceLoading, fetchServiceBySlug } = useUserServiceStore();

    /* ── Sub-services for this parent ── */
    const { 
        currentSubService: currentSub, 
        otherSubServices, 
        loading: subLoading, 
        fetchSubServiceBySlug 
    } = useUserSubServiceStore();

    useEffect(() => {
        if (slug) fetchServiceBySlug(slug as string);
    }, [slug, fetchServiceBySlug]);

    useEffect(() => {
        if (subSlug) fetchSubServiceBySlug(subSlug as string);
    }, [subSlug, fetchSubServiceBySlug]);

    const isLoading = serviceLoading || subLoading || !service || !currentSub;

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1d8f2c]" />
            </div>
        );
    }

    return (
        <main className="font-sans">

            {/* ══════════════ BANNER ══════════════ */}
            <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                <Image
                    src={currentSub.img || "/images/about/b.jpg"}
                    alt={currentSub.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0E171A]/90 via-[#0E171A]/60 to-[#74AD1B]/50" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 mt-14 sm:mt-16 lg:mt-20">
                    <p data-aos="fade-up" data-aos-duration="1000" className="text-[#a8e063] uppercase tracking-widest text-xs sm:text-sm font-semibold mb-3">
                        {service.title}
                    </p>
                    <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
                        {currentSub.title}
                    </h1>

                    {/* Breadcrumb */}
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="mt-4 flex items-center gap-2 text-white/80 text-xs sm:text-sm flex-wrap justify-center">
                        <Link href="/" className="hover:underline hover:opacity-90 transition-opacity">
                            Home
                        </Link>
                        <span>›</span>
                        <Link href="/services" className="hover:underline hover:opacity-90 transition-opacity">
                            Services
                        </Link>
                        <span>›</span>
                        <Link href={`/services/${slug}`} className="hover:underline hover:opacity-90 transition-opacity">
                            {service.title}
                        </Link>
                        <span>›</span>
                        <span className="font-medium text-white">{currentSub.title}</span>
                    </div>
                </div>
            </section>

            {/* ══════════════ CONTENT ══════════════ */}
            <section className="w-full bg-white py-14 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                        {/* ────────── LEFT: Main Content ────────── */}
                        <article data-aos="fade-right" data-aos-duration="1000" className="flex-1 min-w-0">

                            {/* Hero Image */}
                            <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] overflow-hidden">
                                <Image
                                    src={currentSub.img}
                                    alt={currentSub.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Title + Divider */}
                            <h2 className="mt-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#232434] leading-snug">
                                {currentSub.title}
                            </h2>
                            <div className="mt-4 mb-6 w-16 h-1 bg-[#1d8f2c]" />

                            {/* Description */}
                            <div
                                dangerouslySetInnerHTML={{ __html: currentSub.description }}
                                className="prose prose-sm sm:prose-base max-w-none text-[#585858] leading-relaxed rich-text-content"
                            />

                            {/* Back links */}
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={`/services/${slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d8f2c] hover:underline"
                                >
                                    <ArrowLeft size={15} />
                                    Back to {service.title}
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#1d8f2c] hover:underline transition-colors"
                                >
                                    View All Services
                                </Link>
                            </div>
                        </article>

                        {/* ────────── RIGHT: Sidebar ────────── */}
                        <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0 space-y-6">

                            {/* Other Sub Services */}
                            {otherSubServices.length > 0 && (
                                <div data-aos="fade-left" data-aos-duration="1000" className="border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1 h-6 bg-[#1d8f2c]" />
                                        <h3 className="text-lg font-bold text-[#232434]">Other Sub Services</h3>
                                    </div>

                                    <div className="space-y-3">
                                        {otherSubServices.map((sub, idx) => (
                                            <Link
                                                key={sub._id || idx}
                                                href={`/services/${slug}/${sub.slug}`}
                                                className="flex gap-4 group"
                                            >
                                                {/* Thumbnail */}
                                                <div className="relative w-[88px] h-[72px] shrink-0 overflow-hidden">
                                                    <Image
                                                        src={sub.img}
                                                        alt={sub.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-sm font-medium text-[#232434] group-hover:text-[#1d8f2c] transition-colors leading-snug line-clamp-2">
                                                        {sub.title}
                                                    </p>
                                                    <span className="mt-1 text-xs text-[#1d8f2c] font-semibold flex items-center gap-0.5">
                                                        View <ChevronRight size={11} />
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Back to parent */}
                                    <Link
                                        href={`/services/${slug}`}
                                        className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#1d8f2c] hover:underline"
                                    >
                                        <ArrowLeft size={14} />
                                        All {service.title} Services
                                    </Link>
                                </div>
                            )}

                            {/* CTA Banner */}
                            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200" className="relative overflow-hidden bg-[#0E171A] p-8 text-white">
                                {/* Decorative circles */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#1d8f2c]/20" />
                                <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#1d8f2c]/10" />

                                <p className="relative text-xs uppercase tracking-widest text-[#1d8f2c] font-semibold mb-2">
                                    Get a Quote
                                </p>
                                <h4 className="relative text-xl font-bold leading-snug mb-3">
                                    Ready to Get Started?
                                </h4>
                                <p className="relative text-sm text-white/70 leading-relaxed mb-5">
                                    Contact us today and our experts will design the perfect solution for you.
                                </p>
                                <Link
                                    href="/contactus"
                                    className="relative inline-flex items-center gap-2 bg-[#1d8f2c] text-white px-5 py-3 text-sm font-semibold hover:bg-green-700 transition-colors"
                                >
                                    Contact Us
                                    <ChevronRight size={16} />
                                </Link>
                            </div>

                        </aside>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default SubServiceDetailPage;
