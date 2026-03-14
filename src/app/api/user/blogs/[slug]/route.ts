import connect from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connect();
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ message: "Slug is required" }, { status: 400 });
        }

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        // Fetch recent blogs as well (optional but common for detail pages)
        const recentBlogs = await Blog.find({ slug: { $ne: slug } })
            .sort({ createdAt: -1 })
            .limit(3);

        return NextResponse.json({
            blog,
            recentBlogs
        });
    } catch (error) {
        console.error("Error in fetching blog details:", error);
        return NextResponse.json({ message: "Error in fetching blog details" }, { status: 500 });
    }
}
