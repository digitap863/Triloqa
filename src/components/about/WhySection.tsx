"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

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
    {
        title: "Reduces air pollution and greenhouse gas emissions",
        description:
            "Solar energy is a clean and renewable source of power that significantly reduces air pollution and greenhouse gas emissions, helping protect the environment.",
    },
    {
        title: "Requires minimal maintenance after installation",
        description:
            "Once installed, solar systems require very little maintenance, making them a cost-effective and hassle-free energy solution for homes and businesses.",
    },
    {
        title: "Professionally trained installation technicians",
        description:
            "Our installations are carried out by a team of professionally trained and experienced technicians who ensure precision, safety, and high-quality workmanship.",
    },
];

const icons = [
    "/images/home/s-icon-3.svg",
    "/images/home/s-icon-3.svg",
    "/images/home/s-icon-3.svg",
    "/images/home/s-icon-3.svg",
    "/images/home/s-icon-3.svg",
    "/images/home/s-icon-3.svg",
    "/images/home/s-icon-3.svg",
    "/images/home/s-icon-3.svg",
];

const WhySection = () => {
    const swiperRef = useRef<SwiperType>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handleSlideChange = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

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
                    <div data-aos="fade-right" data-aos-duration="1000">
                        <p className="uppercase text-[#1d8f2c] tracking-widest font-semibold text-xs sm:text-sm">
                            Why Choose Us
                        </p>
                        <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#232434] leading-tight">
                            The Triloqa Advantage
                        </h2>
                    </div>

                    {/* Arrow buttons */}
                    <div data-aos="fade-left" data-aos-duration="1000" className="flex items-center gap-3 sm:gap-4 shrink-0 sm:mt-2">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            disabled={isBeginning}
                            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#1d8f2c] flex items-center justify-center text-[#1d8f2c] transition-all
                                ${isBeginning ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#1d8f2c] hover:text-white cursor-pointer'}`}
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            disabled={isEnd}
                            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#1d8f2c] text-white flex items-center justify-center transition-all
                                ${isEnd ? 'opacity-30 cursor-not-allowed' : 'hover:bg-green-700 cursor-pointer'}`}
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* SWIPER CARDS */}
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="relative">
                    <Swiper
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onInit={handleSlideChange}
                        onSlideChange={handleSlideChange}
                        spaceBetween={20}
                        slidesPerView={1.1}
                        breakpoints={{
                            640: { slidesPerView: 2.2, spaceBetween: 20 },
                            1024: { slidesPerView: 3.5, spaceBetween: 30 },
                        }}
                        className="mySwiper !overflow-visible"
                    >
                        {whyChooseUs.map((item, index) => (
                            <SwiperSlide key={index} className="!h-auto">
                                <div
                                    className="group bg-white pt-7 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-5 sm:px-6 lg:px-7 shadow-sm hover:shadow-lg transition-all duration-300 border-b-4 border-transparent hover:border-[#1d8f2c] relative overflow-hidden h-full flex flex-col"
                                >
                                    {/* Decorative corner */}
                                    <span className="absolute top-0 right-0 w-12 h-12 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Icon circle */}
                                    <div className="mb-4 lg:mb-6 w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-green-50 group-hover:bg-[#1d8f2c] flex items-center justify-center transition-colors duration-300 shrink-0">
                                        <Image
                                            src={icons[index]}
                                            height={32}
                                            width={32}
                                            alt={item.title}
                                            className="group-hover:brightness-0 group-hover:invert transition-all duration-300"
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default WhySection;
