"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { useUserServiceStore } from "@/stores/user/serviceStore";
import { useUserSubServiceStore } from "@/stores/user/subServiceStore";

/* ─── Page ─── */
const ServiceDetailPage = () => {
    const { slug } = useParams();
    const { currentService: service, otherServices, loading, fetchServiceBySlug } = useUserServiceStore();
    const { subServices, fetchSubServices } = useUserSubServiceStore();

    useEffect(() => {
        if (slug) {
            fetchServiceBySlug(slug as string);
        }
    }, [slug, fetchServiceBySlug]);

    // Once we know the current service _id, fetch its sub-services
    useEffect(() => {
        if (service?._id) {
            fetchSubServices({ parentServiceId: service._id });
        }
    }, [service?._id, fetchSubServices]);

    const hasSubServices = subServices.length > 0;

    if (loading || !service) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1d8f2c]"></div>
            </div>
        );
    }

    return (
        <main className="font-sans">

            {/* ══════════════ BANNER ══════════════ */}
            <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                <Image
                    src={"/images/b2.jpeg"}
                    alt={service.title}
                    fill
                    className="object-cover object-right"
                    priority
                />
                {/* Overlay */}
                <div className="absolute md:hidden inset-0 bg-linear-to-br from-[#0E171A]/30 via-#74AD1B]/30 to-[#74AD1B]/30" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 mt-14 sm:mt-16 lg:mt-20">
                    <p data-aos="fade-up" data-aos-duration="1000" className="text-[#a8e063] uppercase tracking-widest text-xs sm:text-sm font-semibold mb-3">
                        Our Services
                    </p>
                    <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
                        {service.title}
                    </h1>

                    {/* Breadcrumb */}
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="mt-4 flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                        <Link href="/" className="hover:underline hover:opacity-90 transition-opacity">
                            Home
                        </Link>
                        <span>›</span>
                        <Link href="/services" className="hover:underline hover:opacity-90 transition-opacity">
                            Services
                        </Link>
                        <span>›</span>
                        <span className="font-medium text-white">{service.title}</span>
                    </div>
                </div>
            </section>

            {/* ══════════════ CONTENT ══════════════ */}
            <section className="w-full bg-white py-14 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                        {/* ────────── LEFT: Main Content ────────── */}
                        <article data-aos="fade-right" data-aos-duration="1000" className="flex-1 min-w-0">

                            {/* Hero Image (img1) */}
                            <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] overflow-hidden">
                                <Image
                                    src={service.img1}
                                    alt={`${service.title} – overview`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Title + Divider */}
                            <h2 className="mt-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#232434] leading-snug">
                                {service.title}
                            </h2>
                            <div className="mt-4 mb-6 w-16 h-1 bg-[#1d8f2c]" />

                            {/* Description */}
                            <div
                                dangerouslySetInnerHTML={{ __html: service.description }}
                                className="prose prose-sm sm:prose-base max-w-none text-[#585858] leading-relaxed rich-text-content"
                            />

                            {/* Secondary Image (img2) */}
                            <div className="mt-10 relative w-full h-[220px] sm:h-[300px] lg:h-[380px] overflow-hidden">
                                <Image
                                    src={service.img2}
                                    alt={`${service.title} – showcase`}
                                    fill
                                    className="object-cover"
                                />
                                {/* Green accent bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1d8f2c]" />
                            </div>

                            {/* Back link */}
                            <div className="mt-8">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d8f2c] hover:underline"
                                >
                                    ← Back to All Services
                                </Link>
                            </div>
                        </article>

                        {/* ────────── RIGHT: Sidebar ────────── */}
                        <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0 space-y-6">

                            {/* ── Sub Services (only when they exist) ── */}
                            {hasSubServices && (
                                <div data-aos="fade-left" data-aos-duration="1000" className="border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1 h-6 bg-[#1d8f2c]" />
                                        <h3 className="text-lg font-bold text-[#232434]">Sub Services</h3>
                                    </div>

                                    <div className="space-y-3">
                                        {subServices.map((sub, idx) => (
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
                                </div>
                            )}

                            {/* Other Services List */}
                            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200" className="border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-[#1d8f2c]" />
                                    <h3 className="text-lg font-bold text-[#232434]">Other Services</h3>
                                </div>

                                <div className="space-y-4">
                                    {otherServices.map((item, idx) => (
                                        <Link
                                            key={item._id || idx}
                                            href={`/services/${item.slug}`}
                                            className="flex gap-4 group"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative w-[88px] h-[72px] shrink-0 overflow-hidden">
                                                <Image
                                                    src={item.img1}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Text */}
                                            <div className="flex flex-col justify-center">
                                                <p className="text-sm font-medium text-[#232434] group-hover:text-[#1d8f2c] transition-colors leading-snug line-clamp-2">
                                                    {item.title}
                                                </p>
                                                <span className="mt-1 text-xs text-[#1d8f2c] font-semibold flex items-center gap-0.5">
                                                    View <ChevronRight size={11} />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* View All */}
                                <Link
                                    href="/services"
                                    className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#1d8f2c] hover:underline"
                                >
                                    View All Services
                                    <ArrowRight size={15} />
                                </Link>
                            </div>

                            {/* CTA Banner */}
                            <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400" className="mt-6 relative overflow-hidden bg-[#0E171A] p-8 text-white">
                                {/* Decorative circles */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#1d8f2c]/20" />
                                <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#1d8f2c]/10" />

                                <p className="relative text-xs uppercase tracking-widest text-[#1d8f2c] font-semibold mb-2">
                                    Get a Quote
                                </p>
                                <h4 className="relative text-xl font-bold leading-snug mb-3">
                                    Ready to Switch to Solar Energy?
                                </h4>
                                <p className="relative text-sm text-white/70 leading-relaxed mb-5">
                                    Contact us today and our experts will design the perfect solar solution for your home or business.
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

export default ServiceDetailPage;
