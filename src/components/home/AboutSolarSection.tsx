import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutSolarSection = () => {
    return (
        <section className="w-full bg-white py-16 lg:py-0 lg:h-screen flex items-center font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* LEFT – IMAGE STACK */}
                <div data-aos="fade-right" data-aos-duration="800" className="relative w-full h-[300px] sm:h-[380px] md:h-[440px] lg:h-[520px]">

                    {/* Decorative border box */}
                    <div className="hidden sm:block absolute top-[10%] left-[8%] w-[70%] sm:w-[72%] lg:w-[400px] h-[75%] lg:h-[415px] border-[3px] border-[#1d8f2c]" />

                    {/* Main image */}
                    <div className="absolute top-0 left-0 w-[72%] sm:w-[72%] lg:w-[415px] h-[78%] sm:h-[80%] lg:h-[445px]">
                        <Image
                            src="/images/home/ab1.jpg"
                            alt="Solar worker"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Secondary image */}
                    <div className="absolute bottom-0 right-0 lg:right-1 w-[42%] sm:w-[40%] lg:w-[250px] h-[48%] sm:h-[50%] lg:h-[272px]">
                        <Image
                            src="/images/home/ab2.jpg"
                            alt="Solar inspection"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Completed Homes Badge */}
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="800"
                        data-aos-delay="300"
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-6 sm:right-[40%] lg:right-auto lg:left-[52%] lg:bottom-8 z-10 flex items-center gap-3 bg-white shadow-2xl px-4 py-3 sm:px-5 sm:py-4 rounded-md border-l-4 border-[#1d8f2c]"
                        style={{ boxShadow: "0 8px 32px rgba(29,143,44,0.18)" }}
                    >
                        {/* Green pulsing circle */}
                        <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1d8f2c] shrink-0">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#1d8f2c] opacity-40 animate-ping" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 5v6h4v-6m-4 0H9m6 0h-2m2 0v6h-4v-6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xl sm:text-2xl font-extrabold text-[#1d8f2c] leading-none">150+</p>
                            <p className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mt-0.5">Homes Completed</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT – CONTENT */}
                <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
                    <p className="uppercase text-[#1d8f2c] tracking-wide font-semibold text-sm sm:text-base">
                        About Us
                    </p>

                    <h2 className="mt-3 lg:mt-4 text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] leading-tight">
                        Welcome To Triloqa <br />
                        Green Energy Solutions
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
                                    Bright Sun Support
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
                        <Link href="/about" className="bg-[#1d8f2c] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium flex items-center gap-2 hover:bg-green-700 transition">
                            Explore More
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSolarSection;