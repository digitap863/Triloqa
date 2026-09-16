import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";
import PageHeader from "@/components/about/PageHeader";
import WhySection from "@/components/about/WhySection";
import FaqSection from "@/components/home/FaqSection";
import TestimonialSection from "@/components/home/TestimonialSection";

export const metadata: Metadata = {
  title: "About Us - Triloqa Energy",
  description: "Learn more about Triloqa Energy, our mission, vision, and team.",
  alternates: {
    canonical: "https://www.triloqaenergy.com/about",
    languages: {
      "en-in": "https://www.triloqaenergy.com/about",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
    return (
        <>
            <PageHeader />
            <AboutSection />
            <WhySection />
            <FaqSection />
            <TestimonialSection />
        </>
    );
}

export default page;