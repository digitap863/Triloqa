import { ArrowRight } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
    return (
        <section className="w-full min-h-screen flex items-center font-sans relative py-16 lg:py-0 lg:h-screen">
            <div className="h-full w-full absolute z-0">
                <Image src="/images/about/bg1.jpg" fill alt="bg" className="object-cover" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center relative z-10">

                {/* LEFT – IMAGE STACK */}
                <div data-aos="fade-right" data-aos-duration="1000" className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] lg:h-[520px]">

                    {/* Main image */}
                    <div className="absolute top-0 left-0 w-[72%] lg:w-[415px] h-[78%] lg:h-[445px]">
                        <Image
                            src="/images/about/ab1.png"
                            alt="Solar worker"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Secondary image */}
                    <div className="absolute bottom-0 right-0 lg:right-1 w-[42%] lg:w-[250px] h-[50%] lg:h-[272px] border-[6px] sm:border-[8px] lg:border-[10px] border-white">
                        <Image
                            src="/images/about/ab2.jpg"
                            alt="Solar inspection"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT – CONTENT */}
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                    <p className="uppercase text-[#1d8f2c] tracking-wide font-semibold text-sm sm:text-base">
                        About Us
                    </p>

                    <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] leading-tight">
                        Welcome To Triloqa <br />
                        Power <span className="text-[#1d8f2c]">Energy System</span>
                    </h2>

                    <p className="mt-3 lg:mt-4 text-gray-600 max-w-xl leading-relaxed text-sm sm:text-base">
                        Triloqa Green Energy Solutions brings reliable and affordable solar power to
                        homes, businesses, and industries across Kerala. With our associated top
                        quality brands and customized installations, we ensure our clients a smooth
                        hassle free transformation to renewable energy.
                    </p>

                    {/* FEATURES */}
                    <div className="mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#1d8f2c] flex items-center justify-center text-white shrink-0">
                                <Image src="/images/home/icon-2.svg" height={28} width={28} alt="icon1" className="lg:hidden" />
                                <Image src="/images/home/icon-2.svg" height={36} width={36} alt="icon1" className="hidden lg:block" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-base lg:text-xl text-[#232434]">
                                    Reliability And Performance
                                </h4>
                                <p className="text-xs sm:text-sm text-[#585858] mt-1">
                                    Designed to perform reliably under varying conditions with minimal maintenance.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 lg:gap-4 items-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#1d8f2c] flex items-center justify-center text-white shrink-0">
                                <Image src="/images/home/icon-3.svg" height={28} width={28} alt="icon1" className="lg:hidden" />
                                <Image src="/images/home/icon-3.svg" height={36} width={36} alt="icon1" className="hidden lg:block" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-base lg:text-xl text-[#232434]">
                                    BrightSun Support
                                </h4>
                                <p className="text-xs sm:text-sm text-[#585858] mt-1">
                                    End-to-end customer support for a hassle-free solar energy experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4 lg:my-5" />

                    {/* CTA */}
                    <div className="flex items-center gap-8">
                        <button className="bg-[#1d8f2c] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium flex items-center gap-2 hover:bg-green-700 transition">
                            Explore More
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;