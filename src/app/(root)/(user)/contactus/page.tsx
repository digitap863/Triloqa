import type { Metadata } from "next";
import Banner from "@/components/contact/Banner";
import ContactSection from "@/components/contact/ContactSection";
import MapSection from "@/components/contact/MapSection";

export const metadata: Metadata = {
  title: "Contact Us - Triloqa Energy",
  description: "Get in touch with Triloqa Energy for solar consultations and quotes.",
  alternates: {
    canonical: "https://www.triloqaenergy.com/contactus",
    languages: {
      "en-in": "https://www.triloqaenergy.com/contactus",
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
            <ContactSection />
            <MapSection />
        </>
    );
}

export default page;