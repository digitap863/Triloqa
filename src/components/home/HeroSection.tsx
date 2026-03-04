import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="min-h-screen sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen w-full relative">
            <Image
                src="/images/home/hero1.jpg"
                alt="Hero"
                fill
                className="absolute object-cover top-0 left-0 z-0"
            />
            <div className="h-full w-full absolute bg-black/40 z-10">

            </div>
            <section className="font-sans overflow-hidden mx-auto relative z-20 h-full" data-aos="fade-right">
                <div className="container max-w-7xl mx-auto px-4 xl:px-0">
                    <div className="space-y-6 pt-30 sm:pt-28 md:pt-68">
                        <span className="text-base uppercase bg-[#1d8f2c] text-white font-semibold tracking-wide py-2 px-5">Welcome to triloqa</span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-bold font-ledger text-white leading-none capitalize mt-8">
                            Brighten Your home<br />
                            Lighten your bill
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-justify max-w-[260px] sm:max-w-[280px] md:max-w-lg lg:max-w-[750px] tracking-wide font-medium font-fauna-one text-white mb-6">

                            Enabling a smooth transition to renewable energy through reliable and efficient solar solutions that deliver lasting value and sustainability.

                        </p>
                        <button className="flex gap-3 items-center text-white bg-[#1d8f2c] py-4 px-8 font-semibold">
                            Learn More <span><ChevronRight /></span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HeroSection;