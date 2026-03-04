import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
    {
        title: "Pristine Garden",
        desc: "For your car we will do everything advice repairs",
    },
    {
        title: "Garden Renewal",
        desc: "For your car we will do everything advice repairs",
    },
    {
        title: "SolarEdge Services",
        desc: "For your car we will do everything advice repairs",
    },
    {
        title: "Weed Extraction",
        desc: "For your car we will do everything advice repairs",
    },
];

const ServicesOffer = () => {
    return (
        <section className="w-full min-h-screen flex items-center relative py-16 lg:py-0 lg:h-screen overflow-hidden font-sans">

            <Image src="/images/home/sbg.jpg" alt="bg" fill className="object-cover" />

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-10">
                    <div>
                        <p className="text-[#1d8f2c] uppercase font-semibold tracking-wide text-sm sm:text-base">
                            Services We Offer
                        </p>
                        <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-900 leading-tight">
                            Provide Comprehensive Ecological <br className="hidden sm:block" />
                            Service
                        </h2>
                    </div>

                    {/* ARROWS */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#1d8f2c] flex items-center justify-center text-[#1d8f2c]">
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#1d8f2c] text-white flex items-center justify-center">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* CARDS */}
                <div className="mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white pt-8 lg:pt-10 pb-12 lg:pb-16 px-6 lg:px-8 shadow-sm hover:shadow-md transition"
                        >
                            {/* ICON */}
                            <div className="mb-5 lg:mb-6 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-green-50 flex items-center justify-center">
                                <Image
                                    src="/images/home/s-icon-3.svg"
                                    height={36}
                                    width={36}
                                    alt="icon"
                                    className="lg:hidden"
                                />
                                <Image
                                    src="/images/home/s-icon-3.svg"
                                    height={45}
                                    width={45}
                                    alt="icon"
                                    className="hidden lg:block"
                                />
                            </div>

                            <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                                {item.title}
                            </h3>

                            <p className="mt-3 lg:mt-4 text-gray-500 text-sm lg:text-base leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* BOTTOM LINK */}
                <div className="mt-8 lg:mt-10 text-center">
                    <span className="text-gray-800 font-medium text-sm sm:text-base">
                        Triloqa.{" "}
                        <a href="#" className="text-green-600 underline">
                            View Services
                        </a>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default ServicesOffer;