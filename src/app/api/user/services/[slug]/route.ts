import connect from "@/lib/db/connection";
import Service from "@/lib/db/models/Services";
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

        const service = await Service.findOne({ slug });

        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        // Fetch other services as well (excluding the current one)
        const otherServices = await Service.find({ slug: { $ne: slug } })
            .sort({ createdAt: -1 })
            .limit(5);

        return NextResponse.json({
            service,
            otherServices
        });
    } catch (error) {
        console.error("Error in fetching service details:", error);
        return NextResponse.json({ message: "Error in fetching service details" }, { status: 500 });
    }
}
