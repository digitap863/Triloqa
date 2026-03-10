import AboutSolarSection from "@/components/home/AboutSolarSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestBlog from "@/components/home/LatestBlog";
import ServicesOffer from "@/components/home/ServicesOffer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import Image from "next/image";

export default function Home() {
  return (

    <>
      <Navbar />
      <HeroSection />
      <AboutSolarSection />
      <ServicesOffer />
      <FaqSection />
      <LatestBlog />
      <BrandShowcase />
      <TestimonialSection />
      <Footer />
    </>
  );
}
