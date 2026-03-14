"use client";

import BlogDetailBanner from "@/components/blog/details/BlogDetailBanner";
import BlogDetailContent from "@/components/blog/details/BlogDetailContent";
import { useUserBlogStore } from "@/stores/user/blogStore";

const BlogDetailPage = () => {
    const { currentBlog: blog } = useUserBlogStore();

    return (
        <main>
            <BlogDetailBanner title={blog?.title || "Blog Detail"} />
            <BlogDetailContent />
        </main>
    );
};

export default BlogDetailPage;
