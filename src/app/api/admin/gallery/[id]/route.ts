import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Gallery from "@/lib/db/models/Gallery";
import { NextRequest, NextResponse } from "next/server";

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

        // Delete from Cloudinary if image exists
        if (item.image) {
            try {
                const publicId = item.image.split("/").pop()?.split(".")[0];
                if (publicId) await cloudinary.uploader.destroy(`triloqa/gallery/${publicId}`);
            } catch (err) {
                console.error("Cloudinary delete error:", err);
            }
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
        const imageFile = formData.get("image") as File | null;

        let imageUrl = item.image;

        if (imageFile && imageFile.size > 0) {
            // Delete old image
            try {
                const publicId = item.image.split("/").pop()?.split(".")[0];
                if (publicId) await cloudinary.uploader.destroy(`triloqa/gallery/${publicId}`);
            } catch (err) {
                console.error("Cloudinary old image delete error:", err);
            }

            // Upload new image
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "triloqa/gallery" }, (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }).end(buffer);
            });
            imageUrl = uploadRes.secure_url;
        }

        const updatedItem = await Gallery.findByIdAndUpdate(id, {
            title,
            category,
            image: imageUrl,
            tags: tags ? tags.split(",").map(t => t.trim()) : item.tags
        }, { new: true });

        return NextResponse.json(updatedItem);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
