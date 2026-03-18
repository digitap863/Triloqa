import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Gallery from "@/lib/db/models/Gallery";
import { NextRequest, NextResponse } from "next/server";

// Helper to delete a Cloudinary asset by URL
async function deleteCloudinaryAsset(url: string, resourceType: "image" | "video") {
    try {
        // Extract the public_id from the URL (path after /upload/ without extension)
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(\.[^.]+)?$/);
        if (match && match[1]) {
            await cloudinary.uploader.destroy(match[1], { resource_type: resourceType });
        }
    } catch (err) {
        console.error(`Cloudinary ${resourceType} delete error:`, err);
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connect();
        const item = await Gallery.findById(id);
        if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
        return NextResponse.json(item);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connect();
        const item = await Gallery.findById(id);
        if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

        // Delete image from Cloudinary if exists
        if (item.image) {
            await deleteCloudinaryAsset(item.image, "image");
        }

        // Delete video from Cloudinary if exists
        if (item.video) {
            await deleteCloudinaryAsset(item.video, "video");
        }

        await Gallery.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connect();
        const item = await Gallery.findById(id);
        if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const tags = formData.get("tags") as string;
        const mediaType = (formData.get("mediaType") as string) || item.mediaType || "image";
        const imageFile = formData.get("image") as File | null;
        const videoFile = formData.get("video") as File | null;

        let imageUrl = item.image;
        let videoUrl = item.video;

        // Handle image upload/replace
        if (imageFile && imageFile.size > 0) {
            // Delete old image if exists
            if (item.image) {
                await deleteCloudinaryAsset(item.image, "image");
            }

            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "Triloqa/Gallery", resource_type: "image" },
                    (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                ).end(buffer);
            });
            imageUrl = uploadRes.secure_url;
            // Clear video since media type switched to image
            if (mediaType === "image" && item.video) {
                await deleteCloudinaryAsset(item.video, "video");
                videoUrl = "";
            }
        }

        // Handle video upload/replace
        if (videoFile && videoFile.size > 0) {
            // Delete old video if exists
            if (item.video) {
                await deleteCloudinaryAsset(item.video, "video");
            }

            const arrayBuffer = await videoFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "Triloqa/Gallery", resource_type: "video" },
                    (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                ).end(buffer);
            });
            videoUrl = uploadRes.secure_url;
            // Clear image since media type switched to video
            if (mediaType === "video" && item.image) {
                await deleteCloudinaryAsset(item.image, "image");
                imageUrl = "";
            }
        }

        const updatedItem = await Gallery.findByIdAndUpdate(id, {
            title,
            category,
            mediaType,
            image: imageUrl,
            video: videoUrl,
            tags: tags ? tags.split(",").map(t => t.trim()) : item.tags
        }, { new: true });

        return NextResponse.json(updatedItem);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
