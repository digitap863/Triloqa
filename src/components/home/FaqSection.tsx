"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsDown, ChevronsRight } from "lucide-react";

const faqs = [
    {
        question: "How To Use Solar?",
        answer:
            "There are many variations of passages Lorem Ipsum but the majority have suffered alteration in some form, by injected humor.",
    },
    {
        question: "What Services Does You Offer?",
        answer:
            "We provide solar installation, maintenance, consulting, and energy optimization services for homes and businesses.",
    },
    {
        question: "How To Soft Launch Your Business?",
        answer:
            "Our experts help you plan, execute, and optimize your solar business launch efficiently.",
    },
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="w-full min-h-screen flex items-center bg-white relative font-sans py-16 lg:py-0 lg:h-screen overflow-hidden">

            {/* BACKGROUND SPLIT */}
            <div className="h-full w-full absolute top-0 left-0 flex z-0">
                <div className="h-full w-1/2 relative">
                    <Image src="/images/home/fl.png" fill alt="left-bg" className="object-cover" />
                </div>
                <div className="h-full w-1/2 relative">
                    <Image src="/images/home/fr.png" fill alt="right-bg" className="object-cover" />
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 relative z-10 gap-0 lg:gap-6">

                {/* LEFT IMAGE */}
                <div data-aos="fade-right" data-aos-duration="800" className="hidden lg:block relative p-6 z-10">
                    <div className="relative w-full h-[520px]">
                        <Image
                            src="/images/home/faq.png"
                            alt="FAQ Image"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100" className="px-4 sm:px-8 lg:px-1 py-8 lg:py-14 relative z-10">
                    <p className="text-[#1d8f2c] uppercase font-semibold tracking-wide text-sm sm:text-base">
                        See Our FAQs
                    </p>

                    <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] mt-3 mb-6 lg:mb-10 leading-tight">
                        Frequently Asked Question
                    </h2>

                    <div className="space-y-4 lg:space-y-6">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-md overflow-hidden"
                                >
                                    {/* QUESTION */}
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left"
                                    >
                                        <span
                                            className={`text-base sm:text-lg lg:text-xl font-semibold ${isOpen ? "text-[#1d8f2c]" : "text-[#232434]"
                                                }`}
                                        >
                                            {faq.question}
                                        </span>

                                        {isOpen ? (
                                            <ChevronsDown className="text-[#1d8f2c] shrink-0 ml-3 w-5 h-5" />
                                        ) : (
                                            <ChevronsRight className="text-[#232434] shrink-0 ml-3 w-5 h-5" />
                                        )}
                                    </button>

                                    {/* ANSWER */}
                                    <div
                                        className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-4 sm:pb-5" : "max-h-0"
                                            }`}
                                    >
                                        <p className="text-[#585858] leading-relaxed text-sm sm:text-base">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;