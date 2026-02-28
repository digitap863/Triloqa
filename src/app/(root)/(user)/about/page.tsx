import AboutSection from "@/components/about/AboutSection";
import PageHeader from "@/components/about/PageHeader";
import WhySection from "@/components/about/WhySection";
import FaqSection from "@/components/home/FaqSection";
import TestimonialSection from "@/components/home/TestimonialSection";

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