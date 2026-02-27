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
        <section className="sticky top-0 w-full h-screen flex items-center pt-24 pb-6 overflow-hidden font-sans">

            <Image src={"/images/home/sbg.jpg"} alt="bg" fill />
            <div className="relative max-w-7xl mx-auto px-6">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div className="">
                        <p className="text-[#1d8f2c] uppercase font-semibold tracking-wides text-base">
                            Services We Offer
                        </p>

                        <h2 className="mt-4 text-4xl md:text-[40px] font-bold text-gray-900 leading-tight">
                            Provide Comprehensive Ecological <br />
                            Service
                        </h2>
                    </div>

                    {/* ARROWS */}
                    <div className="flex items-center gap-4">
                        <button className="w-14 h-14 rounded-full border border-[#1d8f2c] flex items-center justify-center text-[#1d8f2c] ">
                            <ArrowRight />
                        </button>
                        <button className="w-14 h-14 rounded-full bg-[#1d8f2c] text-white flex items-center justify-center">
                            <ArrowLeft />
                        </button>
                    </div>
                </div>

                {/* CARDS */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white pt-10 pb-16 px-8 shadow-sm hover:shadow-md transition"
                        >
                            {/* ICON */}
                            <div className=" mb-6 w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                                <Image src={"/images/home/s-icon-3.svg"} height={45} width={45} alt="icons"/>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900">
                                {item.title}
                            </h3>

                            <p className="mt-4 text-gray-500 text-base leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* BOTTOM LINK */}
                <div className="mt-10 text-center">
                    <span className="text-gray-800 font-medium">
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