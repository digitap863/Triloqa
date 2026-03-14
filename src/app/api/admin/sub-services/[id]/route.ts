import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import SubService from "@/lib/db/models/SubService";
import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/admin/sub-services/[id]
───────────────────────────────────────────────────────────────────────────── */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connect();
        const subService = await SubService.findById(id).populate("parentServiceId", "title slug");

        if (!subService) {
            return NextResponse.json({ message: "Sub-service not found" }, { status: 404 });
        }

        return NextResponse.json(subService);
    } catch (error) {
        console.error("Error fetching sub-service:", error);
        return new NextResponse("Error fetching sub-service", { status: 500 });
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/admin/sub-services/[id]
───────────────────────────────────────────────────────────────────────────── */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connect();
        const formData = await req.formData();

        const existing = await SubService.findById(id);
        if (!existing) {
            return NextResponse.json({ message: "Sub-service not found" }, { status: 404 });
        }

        const updates: any = {};

        const title       = formData.get("title")       as string | null;
        const description = formData.get("description") as string | null;
        const orderRaw    = formData.get("order")       as string | null;
        const imgFile     = formData.get("img")         as File   | null;

        if (title)       updates.title = title;
        if (description) updates.description = description;
        if (orderRaw)    updates.order = parseInt(orderRaw);

        // Regenerate slug only if title changed
        if (title) {
            const baseSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            updates.slug = `${baseSlug}-${Date.now().toString(36)}`;
        }

        // Upload new image if provided
        if (imgFile && imgFile.size > 0) {
            const bytes  = await imgFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "Triloqa/SubServices", resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else if (result) resolve(result);
                        else reject(new Error("Cloudinary upload failed"));
                    }
                );
                stream.end(buffer);
            });

            updates.img = uploadResult.secure_url;
        }

        const updated = await SubService.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating sub-service:", error);
        return new NextResponse("Error updating sub-service", { status: 500 });
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/admin/sub-services/[id]
───────────────────────────────────────────────────────────────────────────── */
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connect();

        const deleted = await SubService.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: "Sub-service not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Sub-service deleted successfully" });
    } catch (error) {
        console.error("Error deleting sub-service:", error);
        return new NextResponse("Error deleting sub-service", { status: 500 });
    }
}
