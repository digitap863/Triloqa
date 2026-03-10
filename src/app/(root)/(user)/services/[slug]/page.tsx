import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";

/* ─── Types ─── */
interface ServiceDetailPageProps {
    params: { slug: string };
}

/* ─── Dummy data ─── */
const service = {
    title: "Solar Panel Installation",
    slug: "solar-panel-installation",
    description:
        "Our professional solar panel installation service delivers high-efficiency panels for both residential and commercial properties. We conduct a thorough site assessment, design a bespoke system layout, and deploy certified engineers to ensure a clean, code-compliant installation — all with minimal disruption to your daily life.",
    img1: "/images/home/b1.jpg",
    img2: "/images/home/b1.jpg",
    highlights: [
        "End-to-end project management from survey to handover",
        "Tier-1 monocrystalline panels with 25-year performance warranty",
        "Seamless integration with battery storage and EV chargers",
        "Real-time monitoring dashboard included",
        "Eligible for government subsidies and incentives",
    ],
};

const otherServices = [
    {
        title: "Battery Storage Solutions",
        slug: "battery-storage-solutions",
        img: "/images/home/b1.jpg",
    },
    {
        title: "EV Charging Setup",
        slug: "ev-charging-setup",
        img: "/images/home/b1.jpg",
    },
    {
        title: "Energy Audits",
        slug: "energy-audits",
        img: "/images/home/b1.jpg",
    },
    {
        title: "Maintenance & Support",
        slug: "maintenance-support",
        img: "/images/home/b1.jpg",
    },
];

/* ─── Page ─── */
const ServiceDetailPage = ({ params }: ServiceDetailPageProps) => {
    return (
        <main className="font-sans">

            {/* ══════════════ BANNER ══════════════ */}
            <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                <Image
                    src={service.img1}
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-[#0E171A] via-[#74AD1B]/90 to-[#74AD1B]/90" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 mt-14 sm:mt-16 lg:mt-20">
                    <p className="text-[#a8e063] uppercase tracking-widest text-xs sm:text-sm font-semibold mb-3">
                        Our Services
                    </p>
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
                        {service.title}
                    </h1>

                    {/* Breadcrumb */}
                    <div className="mt-4 flex items-center gap-2 text-white/80 text-xs sm:text-sm">
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
                        <article className="flex-1 min-w-0">

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
                            <p className="text-[#585858] text-sm sm:text-base leading-relaxed">
                                {service.description}
                            </p>

                            {/* Highlights */}
                            <div className="mt-8">
                                <h3 className="text-lg sm:text-xl font-semibold text-[#232434] mb-4">
                                    What&apos;s Included
                                </h3>
                                <ul className="space-y-3">
                                    {service.highlights.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#585858]">
                                            <CheckCircle2
                                                size={18}
                                                className="text-[#1d8f2c] mt-0.5 shrink-0"
                                            />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

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
                        <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0">

                            {/* Other Services List */}
                            <div className="border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-6 bg-[#1d8f2c]" />
                                    <h3 className="text-lg font-bold text-[#232434]">Other Services</h3>
                                </div>

                                <div className="space-y-4">
                                    {otherServices.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/services/${item.slug}`}
                                            className="flex gap-4 group"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative w-[88px] h-[72px] shrink-0 overflow-hidden">
                                                <Image
                                                    src={item.img}
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
                            <div className="mt-6 relative overflow-hidden bg-[#0E171A] p-8 text-white">
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
