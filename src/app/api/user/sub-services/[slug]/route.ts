import connect from "@/lib/db/connection";
import SubService from "@/lib/db/models/SubService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connect();
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ message: "Slug is required" }, { status: 400 });
        }

        const subService = await SubService.findOne({ slug });

        if (!subService) {
            return NextResponse.json({ message: "Sub-service not found" }, { status: 404 });
        }

        // Fetch other sub-services from the same parent (excluding the current one)
        const otherSubServices = await SubService.find({ 
            parentServiceId: subService.parentServiceId,
            slug: { $ne: slug } 
        })
            .sort({ order: 1, createdAt: -1 })
            .limit(5);

        return NextResponse.json({
            subService,
            otherSubServices
        });
    } catch (error) {
        console.error("Error in fetching sub-service details:", error);
        return NextResponse.json({ message: "Error in fetching sub-service details" }, { status: 500 });
    }
}
