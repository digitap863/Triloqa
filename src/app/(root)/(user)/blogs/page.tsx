import type { Metadata } from "next";
import Banner from "@/components/blog/Banner";
import Blogs from "@/components/blog/Blogs";
import FaqSection from "@/components/home/FaqSection";
import TestimonialSection from "@/components/home/TestimonialSection";

export const metadata: Metadata = {
  title: "Blogs & News - Triloqa Energy",
  description: "Stay updated with the latest solar energy news, tips, and insights.",
  alternates: {
    canonical: "https://www.triloqaenergy.com/blogs",
    languages: {
      "en-in": "https://www.triloqaenergy.com/blogs",
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
            <Banner />
            <Blogs />
            <FaqSection />
            <TestimonialSection />
        </>
    );
}

export default page;