import BlogDetailBanner from "@/components/blog/details/BlogDetailBanner";
import BlogDetailContent from "@/components/blog/details/BlogDetailContent";

interface BlogDetailPageProps {
    params: { slug: string };
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
    // In a real app, fetch blog data using params.slug
    const title = "Harnessing The Sun: The Future Of Solar Power In Modern Homes";

    return (
        <main>
            <BlogDetailBanner title={title} />
            <BlogDetailContent />
        </main>
    );
};

export default BlogDetailPage;
