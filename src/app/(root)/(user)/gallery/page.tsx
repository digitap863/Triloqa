import type { Metadata } from "next";
import Banner from "@/components/gallery/Banner";
import GallerySection from "@/components/gallery/GallerySection";

export const metadata: Metadata = {
  title: "Gallery - Triloqa Energy",
  description: "View our portfolio of completed solar installations and projects.",
  alternates: {
    canonical: "https://www.triloqaenergy.com/gallery",
    languages: {
      "en-in": "https://www.triloqaenergy.com/gallery",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Gallery = () => {
    return (
        <>
            <Banner />
            <GallerySection />
        </>
    );
}

export default Gallery;