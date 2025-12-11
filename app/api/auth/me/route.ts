import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const user = getAuthUser(request);
        if (!user) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to get user" },
            { status: 500 }
        );
    }
}

