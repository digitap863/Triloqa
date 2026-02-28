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

const ServiceSection = () => {
    return (
        <section className=" w-full min-h-screen  flex items-center relative  pb-6 overflow-hidden font-sans">
            <div className="relative max-w-7xl mx-auto px-6 py-20">
                {/* HEADER */}
                <div className="flex items-center justify-center">
                    <div className="">
                        <p className="text-[#1d8f2c] text-center mb-4 uppercase font-semibold tracking-wides text-base">
                            Services We Offer
                        </p>
                        {/* Heading */}
                        <h2 className="text-center text-4xl md:text-5xl font-bold text-[#1f2330] mb-8">
                            Provide Comprehensive Ecological<br /> Service
                        </h2>
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
                                <Image src={"/images/home/s-icon-3.svg"} height={45} width={45} alt="icons" />
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

            </div>
        </section>
    );
}

export default ServiceSection;