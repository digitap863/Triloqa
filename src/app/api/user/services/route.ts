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

        const services = await Service.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Service.countDocuments(query);

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
        return NextResponse.json({ message: "Error in fetching services" }, { status: 500 });
    }
}
