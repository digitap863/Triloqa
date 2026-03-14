import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import SubService from "@/lib/db/models/SubService";
import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────────────
   GET  /api/admin/sub-services?parentServiceId=<id>&page=1&limit=10
   Returns a paginated list of sub-services for a given parent service.
───────────────────────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);

        const parentServiceId = searchParams.get("parentServiceId");
        const page  = parseInt(searchParams.get("page")  || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip  = (page - 1) * limit;

        const query: any = {};
        if (parentServiceId) query.parentServiceId = parentServiceId;

        const total = await SubService.countDocuments(query);
        const subServices = await SubService.find(query)
            .sort({ order: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            subServices,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching sub-services:", error);
        return new NextResponse("Error fetching sub-services", { status: 500 });
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/admin/sub-services
   Creates a new sub-service. Expects multipart/form-data:
     - title          (string, required)
     - description    (string, required — rich HTML from TipTap)
     - img            (File, required)
     - parentServiceId (string, required — ObjectId of parent Service)
     - order          (number, optional)
───────────────────────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
    try {
        await connect();
        const formData = await req.formData();

        const title           = formData.get("title")           as string;
        const description     = formData.get("description")     as string;
        const parentServiceId = formData.get("parentServiceId") as string;
        const imgFile         = formData.get("img")             as File;
        const order           = parseInt(formData.get("order")  as string || "0");

        // ── Validation ──
        if (!title || !description || !parentServiceId || !imgFile) {
            return NextResponse.json(
                { message: "title, description, parentServiceId and img are all required." },
                { status: 400 }
            );
        }

        // ── Generate unique slug ──
        const baseSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        // Append a short timestamp suffix to guarantee uniqueness across parents
        const slug = `${baseSlug}-${Date.now().toString(36)}`;

        // ── Upload image to Cloudinary ──
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

        const imgUrl = uploadResult.secure_url;

        // ── Persist ──
        const subService = await SubService.create({
            parentServiceId,
            title,
            slug,
            description,
            img: imgUrl,
            order,
        });

        return NextResponse.json(subService, { status: 201 });
    } catch (error: any) {
        console.error("Error creating sub-service:", error);

        // Duplicate slug guard (shouldn't happen with timestamp suffix, but just in case)
        if (error.code === 11000) {
            return NextResponse.json(
                { message: "A sub-service with this slug already exists." },
                { status: 409 }
            );
        }

        return new NextResponse("Error creating sub-service", { status: 500 });
    }
}
