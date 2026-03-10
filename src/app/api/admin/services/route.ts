import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Service from "@/lib/db/models/Services";
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

        const total = await Service.countDocuments(query);
        const services = await Service.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            services,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error in fetching services:", error);
        return new NextResponse("Error in fetching services", { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const formData = await req.formData();
        
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const img1File = formData.get("img1") as File;
        const img2File = formData.get("img2") as File;

        if (!title || !description || !img1File || !img2File) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Generate Slug
        let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

        let img1Url = "";
        if (img1File && typeof img1File !== "string") {
            const bytes = await img1File.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "Triloqa/Services", resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else if (result) resolve(result);
                        else reject(new Error("Upload failed"));
                    }
                );
                uploadStream.end(buffer);
            });
            img1Url = uploadResult.secure_url;
        }

        let img2Url = "";
        if (img2File && typeof img2File !== "string") {
            const bytes = await img2File.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "Triloqa/Services", resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else if (result) resolve(result);
                        else reject(new Error("Upload failed"));
                    }
                );
                uploadStream.end(buffer);
            });
            img2Url = uploadResult.secure_url;
        }

        const service = await Service.create({
            title,
            slug,
            description,
            img1: img1Url,
            img2: img2Url,
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error("Error in adding service:", error);
        return new NextResponse("Error in adding service", { status: 400 });
    }
}
