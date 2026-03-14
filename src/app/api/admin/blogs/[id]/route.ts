import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connect();
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connect();
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        // Delete from Cloudinary if image exists
        if (blog.image) {
            try {
                const publicId = blog.image.split("/").pop()?.split(".")[0];
                if (publicId) await cloudinary.uploader.destroy(`triloqa/blogs/${publicId}`);
            } catch (err) {
                console.error("Cloudinary delete error:", err);
            }
        }

        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connect();
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const date = formData.get("date") as string;
        const tags = formData.get("tags") as string;
        const contentStr = formData.get("content") as string;
        const imageFile = formData.get("image") as File | null;

        let imageUrl = blog.image;

        if (imageFile && imageFile.size > 0) {
            // Delete old image
            try {
                const publicId = blog.image.split("/").pop()?.split(".")[0];
                if (publicId) await cloudinary.uploader.destroy(`triloqa/blogs/${publicId}`);
            } catch (err) {
                console.error("Cloudinary old image delete error:", err);
            }

            // Upload new image
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "triloqa/blogs" }, (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }).end(buffer);
            });
            imageUrl = uploadRes.secure_url;
        }

        const tagsArray = tags ? tags.split(",").map(t => t.trim()) : blog.tags;
        const content = contentStr ?? blog.content;

        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title,
            author,
            date,
            image: imageUrl,
            tags: tagsArray,
            content,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        }, { new: true });

        return NextResponse.json(updatedBlog);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
