import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Service from "@/lib/db/models/Services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const service = await Service.findById(params.id);
        if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
        return NextResponse.json(service);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const service = await Service.findById(params.id);
        if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

        // Delete from Cloudinary
        const imagesToDelete = [service.img1, service.img2];
        for (const imgUrl of imagesToDelete) {
            if (imgUrl) {
                try {
                    const publicId = imgUrl.split("/").pop()?.split(".")[0];
                    if (publicId) await cloudinary.uploader.destroy(`triloqa/services/${publicId}`);
                } catch (err) {
                    console.error("Cloudinary delete error:", err);
                }
            }
        }

        await Service.findByIdAndDelete(params.id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const service = await Service.findById(params.id);
        if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const img1File = formData.get("img1") as File | null;
        const img2File = formData.get("img2") as File | null;

        let img1Url = service.img1;
        let img2Url = service.img2;

        // Image 1 handling
        if (img1File && img1File.size > 0) {
            try {
                const publicId = service.img1.split("/").pop()?.split(".")[0];
                if (publicId) await cloudinary.uploader.destroy(`triloqa/services/${publicId}`);
            } catch (err) { }
            const arrayBuffer = await img1File.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "triloqa/services" }, (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }).end(buffer);
            });
            img1Url = uploadRes.secure_url;
        }

        // Image 2 handling
        if (img2File && img2File.size > 0) {
            try {
                const publicId = service.img2.split("/").pop()?.split(".")[0];
                if (publicId) await cloudinary.uploader.destroy(`triloqa/services/${publicId}`);
            } catch (err) { }
            const arrayBuffer = await img2File.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "triloqa/services" }, (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }).end(buffer);
            });
            img2Url = uploadRes.secure_url;
        }

        const updatedService = await Service.findByIdAndUpdate(params.id, {
            title,
            description,
            img1: img1Url,
            img2: img2Url,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        }, { new: true });

        return NextResponse.json(updatedService);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
