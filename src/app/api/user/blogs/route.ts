import connect from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);

        const search = searchParams.get("search");
        const tag = searchParams.get("tag");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const query: any = {};
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        if (tag) {
            query.tags = tag;
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments(query);

        return NextResponse.json({
            blogs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error in fetching blogs:", error);
        return NextResponse.json({ message: "Error in fetching blogs" }, { status: 500 });
    }
}
