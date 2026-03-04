"use client";

import Image from "next/image";

const brands = [
    { src: "/images/home/brands/1.webp", alt: "Brand 1" },
    { src: "/images/home/brands/2.jpg", alt: "Brand 2" },
    { src: "/images/home/brands/5.png", alt: "Brand 3" },
    { src: "/images/home/brands/4.png", alt: "Brand 4" },
];
const brands2 = [
    { src: "/images/home/brands/6.png", alt: "Brand 6" },
    { src: "/images/home/brands/7.png", alt: "Brand 7" },
    { src: "/images/home/brands/8.png", alt: "Brand 8" },
    { src: "/images/home/brands/9.png", alt: "Brand 9" },
];

const marqueeItems = [...brands, ...brands, ...brands, ...brands];
const marqueeItems2 = [...brands2, ...brands2, ...brands2, ...brands2];

const BrandShowcase = () => {
    return (
        <section className="w-full pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14 bg-white font-sans overflow-hidden">

            {/* HEADER — Panels */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 lg:mb-10">
                <div className="flex flex-col items-center text-center">
                    <p className="uppercase text-[#1d8f2c] font-semibold tracking-widest text-xs sm:text-sm">
                        The Brands that We Associates
                    </p>
                    <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] leading-tight max-w-2xl">
                        We use tier 1 panels with 30 years performance warranty
                    </h2>
                </div>
            </div>

            {/* MARQUEE 1 */}
            <div className="relative w-full">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-20 lg:w-24 z-10"
                    style={{ background: "linear-gradient(to right, white, transparent)" }} />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-20 lg:w-24 z-10"
                    style={{ background: "linear-gradient(to left, white, transparent)" }} />

                <div className="flex gap-4 sm:gap-6 lg:gap-8 w-max animate-marquee">
                    {marqueeItems.map((brand, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-36 sm:w-44 lg:w-52 h-18 sm:h-20 lg:h-24 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1d8f2c]/30 transition-all duration-300 px-4 sm:px-5 lg:px-6 shrink-0"
                        >
                            <div className="relative w-full h-9 sm:h-11 lg:h-12">
                                <Image
                                    src={brand.src}
                                    alt={brand.alt}
                                    fill
                                    className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* HEADER — Inverters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8 lg:my-10">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] leading-tight max-w-2xl">
                        We use premium inverters upto 10 years warranty
                    </h2>
                </div>
            </div>

            {/* MARQUEE 2 */}
            <div className="relative w-full">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-20 lg:w-24 z-10"
                    style={{ background: "linear-gradient(to right, white, transparent)" }} />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-20 lg:w-24 z-10"
                    style={{ background: "linear-gradient(to left, white, transparent)" }} />

                <div className="flex gap-4 sm:gap-6 lg:gap-8 w-max animate-marquee">
                    {marqueeItems2.map((brand, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-36 sm:w-44 lg:w-52 h-18 sm:h-20 lg:h-24 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1d8f2c]/30 transition-all duration-300 px-4 sm:px-5 lg:px-6 shrink-0"
                        >
                            <div className="relative w-full h-9 sm:h-11 lg:h-12">
                                <Image
                                    src={brand.src}
                                    alt={brand.alt}
                                    fill
                                    className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default BrandShowcase;