import FaqSection from "@/components/home/FaqSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import PageHeader from "@/components/services/PageHeader";
import ServiceSection from "@/components/services/ServiceSection";

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