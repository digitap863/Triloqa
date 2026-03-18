import connect from "@/lib/db/connection";
import Gallery from "@/lib/db/models/Gallery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);

        const category = searchParams.get("category");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const skip = (page - 1) * limit;

        const query: any = {};
        if (category && category !== "All") {
            query.category = category;
        }

        const galleryItems = await Gallery.find(query)
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit);

        const total = await Gallery.countDocuments(query);

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
        console.error("Error in fetching gallery items:", error);
        return NextResponse.json({ message: "Error in fetching gallery items" }, { status: 500 });
    }
}
