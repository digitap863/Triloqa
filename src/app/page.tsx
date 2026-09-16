import type { Metadata } from "next";
import AboutSolarSection from "@/components/home/AboutSolarSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestBlog from "@/components/home/LatestBlog";
import ServicesOffer from "@/components/home/ServicesOffer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: "Triloqa Energy - Solar Energy Solutions",
  description: "Triloqa Energy provides top tier solar energy solutions.",
  alternates: {
    canonical: "https://www.triloqaenergy.com/",
    languages: {
      "en-in": "https://www.triloqaenergy.com/",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
