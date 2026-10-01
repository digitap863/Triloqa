import type { Metadata } from "next";
import FaqSection from "@/components/home/FaqSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import PageHeader from "@/components/services/PageHeader";
import ServiceSection from "@/components/services/ServiceSection";

export const metadata: Metadata = {
  title: "Our Services - Triloqa Energy",
  description: "Explore our range of solar energy services and solutions.",
  alternates: {
    canonical: "https://www.triloqaenergy.com/services",
    languages: {
      "en-in": "https://www.triloqaenergy.com/services",
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
            <ServiceSection />
            <FaqSection />
            <TestimonialSection />
        </>
    );
}

export default page;