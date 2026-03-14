import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);

        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const query: any = {};
        
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const total = await Blog.countDocuments(query);
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            blogs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error in fetching blogs:", error);
        return new NextResponse("Error in fetching blogs", { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const formData = await req.formData();
        
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const date = formData.get("date") as string;
        const tagsInput = formData.get("tags") as string;
        const contentJson = formData.get("content") as string;
        const file = formData.get("image") as File;

        if (!title || !file) {
            return NextResponse.json({ message: "Title and image are required" }, { status: 400 });
        }

        // Generate Slug
        let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const existing = await Blog.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()).filter(t => t) : [];
        const content = contentJson || "";

        let imageUrl = "";
        if (file && typeof file !== "string") {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "Triloqa/Blogs", resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else if (result) resolve(result);
                        else reject(new Error("Upload failed"));
                    }
                );
                uploadStream.end(buffer);
            });
            imageUrl = uploadResult.secure_url;
        }

        const blog = await Blog.create({
            title,
            slug,
            author,
            date,
            tags,
            content,
            image: imageUrl,
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        console.error("Error in adding blog:", error);
        return new NextResponse("Error in adding blog", { status: 400 });
    }
}
