import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        (await cookies()).delete("accessToken");

        return NextResponse.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error during logout: " + error },
            { status: 500 }
        );
    }
};
