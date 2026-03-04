import Banner from "@/components/blog/Banner";
import Blogs from "@/components/blog/Blogs";
import FaqSection from "@/components/home/FaqSection";
import TestimonialSection from "@/components/home/TestimonialSection";

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