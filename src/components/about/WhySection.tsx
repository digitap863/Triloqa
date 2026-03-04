import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export const whyChooseUs = [
    {
        title: "Reliable and customer friendly",
        description:
            "We prioritize trust, transparency, and long-term relationships by delivering dependable solutions and responsive support tailored to customer needs.",
    },
    {
        title: "Online site monitoring",
        description:
            "Our online monitoring system allows continuous performance tracking, helping identify issues early and ensuring your system operates at peak efficiency.",
    },
    {
        title: "Use of Tier 1 panels with installation as per International standards",
        description:
            "We use certified Tier 1 solar panels and follow internationally recognized installation standards to ensure safety, durability, and maximum energy output.",
    },
    {
        title: "On site inspection and maintenance support for 5 years from installation",
        description:
            "Comprehensive on-site inspections and maintenance support are provided for five years after installation to maintain system reliability and performance.",
    },
];

const icons = [
    "/images/home/icon-2.svg",
    "/images/home/s-icon-3.svg",
    "/images/home/icon-3.svg",
    "/images/home/s-icon-3.svg",
];

const WhySection = () => {
    return (
        <section className="relative w-full py-14 sm:py-20 lg:py-24 overflow-hidden font-sans">
            {/* Background image */}
            <Image
                src="/images/home/sbg.jpg"
                alt="bg"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-white/80" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 sm:mb-10 lg:mb-14 gap-5 sm:gap-10">
                    <div>
                        <p className="uppercase text-[#1d8f2c] tracking-widest font-semibold text-xs sm:text-sm">
                            Why Choose Us
                        </p>
                        <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#232434] leading-tight">
                            The Triloqa Advantage
                        </h2>
                    </div>

                    {/* Arrow buttons */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 sm:mt-2">
                        <button className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#1d8f2c] flex items-center justify-center text-[#1d8f2c] hover:bg-green-50 transition">
                            <ArrowLeft size={18} className="sm:hidden" />
                            <ArrowLeft size={20} className="hidden sm:block" />
                        </button>
                        <button className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#1d8f2c] text-white flex items-center justify-center hover:bg-green-700 transition">
                            <ArrowRight size={18} className="sm:hidden" />
                            <ArrowRight size={20} className="hidden sm:block" />
                        </button>
                    </div>
                </div>

                {/* CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {whyChooseUs.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white pt-7 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-5 sm:px-6 lg:px-7 shadow-sm hover:shadow-lg transition-all duration-300 border-b-4 border-transparent hover:border-[#1d8f2c] relative overflow-hidden"
                        >
                            {/* Decorative corner */}
                            <span className="absolute top-0 right-0 w-12 h-12 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Icon circle */}
                            <div className="mb-4 lg:mb-6 w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-green-50 group-hover:bg-[#1d8f2c] flex items-center justify-center transition-colors duration-300">
                                <Image
                                    src={icons[index]}
                                    height={28}
                                    width={28}
                                    alt={item.title}
                                    className="lg:hidden group-hover:brightness-0 group-hover:invert transition-all duration-300"
                                />
                                <Image
                                    src={icons[index]}
                                    height={32}
                                    width={32}
                                    alt={item.title}
                                    className="hidden lg:block group-hover:brightness-0 group-hover:invert transition-all duration-300"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-base lg:text-[17px] font-bold text-[#232434] leading-snug group-hover:text-[#1d8f2c] transition-colors duration-300">
                                {item.title}
                            </h3>

                            {/* Divider */}
                            <div className="my-3 lg:my-4 w-10 h-[2px] bg-[#1d8f2c]/30 group-hover:w-full transition-all duration-500" />

                            {/* Description */}
                            <p className="text-[#585858] text-xs sm:text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhySection;