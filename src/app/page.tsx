import AboutSolarSection from "@/components/home/AboutSolarSection";
import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestBlog from "@/components/home/LatestBlog";
import ServicesOffer from "@/components/home/ServicesOffer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Image from "next/image";

export default function Home() {
  return (

    <>
      <HeroSection />
      <AboutSolarSection />
      <ServicesOffer />
      <FaqSection />
      <LatestBlog />
      <TestimonialSection />
    </>
  );
}
