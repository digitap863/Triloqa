"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

const testimonials = [
  {
    id: 1,
    name: "Indira Saseendran",
    role: "Home Owner",
    image: "/images/home/t1.jpg",
    content: "We entrusted Triloqa Solar for installing a 25 KW Solar plant at our Jewellery shop (Aradhana Jewellery) in Tripunithura. They explained all the process clearly and completed the installation on time with utmost quality. I highly recommend Triloqa Solar for all commercial establishments.",
  },
  {
    id: 2,
    name: "shyju antony",
    role: "Business Manager",
    image: "/images/home/t1.jpg",
    content: "Happy with the 5 kW solar system installation. The work was well planned, executed neatly, and completed without delays. The system is running efficiently and has already helped reduce our monthly electricity costs. Good experience overall.",
  },
  {
    id: 3,
    name: "VINU MENON",
    role: "Interior Designer",
    image: "/images/home/t1.jpg",
    content: "Very happy with the 10 kW solar system installed by Triloqa Green Energy Solutions. The process was smooth, explanations were clear, and the team was professional. Noticed reduced power bills within a short time. Strongly recommend going solar with them.",
  },
  {
    id: 4,
    name: "Naresh Kumar",
    role: "Tech Consultant",
    image: "/images/home/t1.jpg",
    content: "I installed 8Kw solar plant from them, well executed from start to end. They gave me a technically sound and competitive Quote at the beginning and stick to it till end. I didn't have to visit KSEB once. Good Customer service. They used all good materials for the whole project.",
  },
];

const TestimonialSection = () => {
  const swiperRef = useRef<SwiperType>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="w-full min-h-[600px] lg:min-h-screen bg-white py-16 sm:py-20 lg:py-24 relative font-sans flex items-center overflow-hidden">
      <div className="h-[50%] w-full absolute bottom-0 bg-[#282832] z-0" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={handleSlideChange}
          onSlideChange={handleSlideChange}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          className="testimonial-swiper !overflow-visible"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div data-aos="fade-up" data-aos-duration="1000" className="bg-[#f3f7fb] shadow-xl p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
                {/* LEFT IMAGE */}
                <div className="relative shrink-0">
                  <div className="relative h-[240px] w-[210px] sm:h-[300px] sm:w-[260px] lg:h-[360px] lg:w-[314px] overflow-hidden shadow-2xl">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                    {/* Visual Decor */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1d8f2c]" />
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full relative">
                  <p className="uppercase text-[#1d8f2c] font-semibold tracking-wide text-sm sm:text-base">
                    Testimonials
                  </p>

                  <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] mt-2 leading-tight">
                    What Our Clients Say
                  </h2>

                  {/* Quote Icon Background (Decorative) */}
                  <div className="absolute -top-4 -right-2 opacity-5 pointer-events-none hidden sm:block">
                    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 45.4545V0H36.3636V45.4545L18.1818 80H0L18.1818 45.4545H0ZM63.6364 45.4545V0H100V45.4545L81.8182 80H63.6364L81.8182 45.4545H63.6364Z" fill="#1D8F2C" />
                    </svg>
                  </div>

                  <p className="text-gray-600 leading-relaxed mt-4 lg:mt-6 text-base sm:text-lg italic">
                    "{testimonial.content}"
                  </p>

                  <div className="w-20 h-1 bg-[#1d8f2c] my-6" />

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold text-gray-900 text-lg sm:text-xl">
                        {testimonial.name}
                      </p>
                      {/* <p className="text-[#1d8f2c] font-medium text-sm sm:text-base">
                        {testimonial.role}
                      </p> */}
                    </div>

                    {/* Navigation inside card for better impact */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); swiperRef.current?.slidePrev(); }}
                        disabled={isBeginning}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#1d8f2c] flex items-center justify-center text-[#1d8f2c] transition-all
                          ${isBeginning ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#1d8f2c] hover:text-white pointer-events-auto'}`}
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); swiperRef.current?.slideNext(); }}
                        disabled={isEnd}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1d8f2c] text-white flex items-center justify-center transition-all
                          ${isEnd ? 'opacity-30 cursor-not-allowed' : 'hover:bg-green-700 pointer-events-auto'}`}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
