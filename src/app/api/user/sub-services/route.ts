import connect from "@/lib/db/connection";
import SubService from "@/lib/db/models/SubService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);

        const parentServiceId = searchParams.get("parentServiceId");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const skip = (page - 1) * limit;

        const query: any = {};
        if (parentServiceId) {
            query.parentServiceId = parentServiceId;
        }

        const subServices = await SubService.find(query)
            .sort({ order: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await SubService.countDocuments(query);

        return NextResponse.json({
            subServices,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error in fetching sub-services:", error);
        return NextResponse.json({ message: "Error in fetching sub-services" }, { status: 500 });
    }
}
