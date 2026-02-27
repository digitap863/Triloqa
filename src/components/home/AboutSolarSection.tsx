import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";

const AboutSolarSection = () => {
    return (
        <section className="w-full bg-white h-screen flex items-center  font-sans sticky top-0 pt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* LEFT – IMAGE STACK */}
                <div className="relative w-full h-[520px]">

                    <div className="w-[400px] h-[415px] absolute top-20 left-16 border-3 border-[#1d8f2c]"></div>

                    {/* Main image */}
                    <div className="absolute top-0 left-0 w-[415px] h-[445px]">
                        <Image
                            src="/images/home/ab1.jpg"
                            alt="Solar worker"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Secondary image */}
                    <div className="absolute bottom-0 right-1 w-[250px] h-[272px]">
                        <Image
                            src="/images/home/ab2.jpg"
                            alt="Solar inspection"
                            fill
                            className="object-cover"
                        />
                    </div>


                </div>

                {/* RIGHT – CONTENT */}
                <div>
                    <p className="uppercase text-[#1d8f2c] tracking-wide font-semibold text-base">
                        About Us
                    </p>

                    <h2 className="mt-4 text-4xl lg:text-[40px] font-bold text-[#232434] leading-tight">
                        Welcome To Triloqa <br />
                        Power Energy System
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-xl leading-relaxed">
                        Triloqa Green Energy Solutions brings reliable and affordable solar power to
                        homes, businesses, and industries across Kerala. With our associated top
                        quality brands and customized installations, we ensure our clients a smooth
                        hassle free transformation to renewable energy.
                    </p>

                    {/* FEATURES */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-[#1d8f2c] flex items-center justify-center text-white shrink-0">
                                <Image src={"/images/home/icon-2.svg"} height={36} width={36} alt="icon1"/>
                            </div>
                            <div>
                                <h4 className="font-semibold text-xl text-[#232434]">
                                    Reliability And Performance
                                </h4>
                                <p className="text-sm text-[#585858] mt-1">
                                    Designed to perform reliably under varying conditions with minimal maintenance.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="w-20 h-20 rounded-full bg-[#1d8f2c] flex items-center justify-center text-white shrink-0">
                                <Image src={"/images/home/icon-3.svg"} height={36} width={36} alt="icon1"/>
                            </div>
                            <div>
                                <h4 className="font-semibold text-xl text-[#232434]">
                                    BrightSun Support
                                </h4>
                                <p className="text-sm text-[#585858] mt-1">
                                    End-to-end customer support for a hassle-free solar energy experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="my-5" />

                    {/* CTA + FOUNDER */}
                    <div className="flex items-center gap-8">
                        <button className="bg-[#1d8f2c] text-white px-8 py-4 font-medium flex items-center gap-2 hover:bg-green-700 transition">
                            Explore More
                            <ArrowRight size={18} />
                        </button>

                        
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSolarSection;