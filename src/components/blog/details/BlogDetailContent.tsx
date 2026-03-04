import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="min-h-screen w-full relative">
            <Image
                src="/images/home/hero1.jpg"
                alt="Hero"
                fill
                className="absolute top-0 left-0 z-0 object-cover"
            />
            <div className="h-full w-full absolute bg-black/40 z-10" />

            <section
                className="font-sans overflow-hidden mx-auto relative z-20 h-full"
                data-aos="fade-right"
            >
                <div className="container max-w-7xl mx-auto px-4 xl:px-0">
                    <div className="space-y-4 sm:space-y-5 lg:space-y-6 pt-28 sm:pt-32 md:pt-40 lg:pt-48 xl:pt-60 pb-16 sm:pb-20 lg:pb-0">

                        {/* Badge */}
                        <span className="inline-block text-xs sm:text-sm lg:text-base uppercase bg-[#1d8f2c] text-white font-semibold tracking-wide py-1.5 sm:py-2 px-4 sm:px-5">
                            Welcome to triloqa
                        </span>

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-bold font-ledger text-white leading-tight lg:leading-none capitalize">
                            Brighten Your home<br />
                            Lighten your bill
                        </h1>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg text-justify max-w-[90%] sm:max-w-sm md:max-w-lg lg:max-w-[750px] tracking-wide font-medium font-fauna-one text-white">
                            Enabling a smooth transition to renewable energy through reliable and efficient solar solutions that deliver lasting value and sustainability.
                        </p>

                        {/* CTA Button */}
                        <button className="flex gap-3 items-center text-white bg-[#1d8f2c] py-3 sm:py-4 px-6 sm:px-8 font-semibold text-sm sm:text-base hover:bg-[#176e22] transition-colors duration-200">
                            Learn More <span><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></span>
                        </button>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;