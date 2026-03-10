import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Gallery from "@/lib/db/models/Gallery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);

        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const query: any = {};
        
        if (category && category !== "ALL") {
            query.category = category;
        }
        
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const total = await Gallery.countDocuments(query);
        const galleryItems = await Gallery.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            galleryItems,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error in fetching gallery items:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        return new NextResponse("Error in fetching gallery: " + error, {
            status: 400,
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const formData = await req.formData();
        
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const date = formData.get("date") as string;
        const tagsInput = formData.get("tags") as string;
        const file = formData.get("image") as File;

        if (!title || !category || !date || !file) {
            return NextResponse.json(
                { message: "Title, category, date, and image are required" },
                { status: 400 }
            );
        }

        const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()).filter(t => t) : [];

        let imageUrl = "";

        if (file && typeof file !== "string") {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "Triloqa/Gallery", resource_type: "auto" },
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

        const galleryItem = await Gallery.create({
            title,
            category,
            date,
            tags,
            image: imageUrl,
        });

        return NextResponse.json(galleryItem, { status: 201 });
    } catch (error) {
       console.error("Error in adding gallery item:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new NextResponse("Error in adding gallery item: " + error, {
      status: 400,
    });
  }
}
