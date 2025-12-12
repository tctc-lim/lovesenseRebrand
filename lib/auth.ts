import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "admin@lovesense2488";

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string; // "superAdmin" or "admin"
}

export function verifyToken(token: string): AuthUser | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthUser & { iat?: number; exp?: number };
        return {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
        };
    } catch {
        return null;
    }
}

export function getAuthUser(request: NextRequest): AuthUser | null {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.replace("Bearer ", "");
    return verifyToken(token);
}

export function requireAuth(request: NextRequest): AuthUser {
    const user = getAuthUser(request);
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
}

export function requireAdmin(request: NextRequest): AuthUser {
    const user = requireAuth(request);
    const role = user.role.toLowerCase();
    if (role !== "admin" && role !== "superadmin") {
        throw new Error("Forbidden: Admin access required");
    }
    return user;
}

export function requireSuperAdmin(request: NextRequest): AuthUser {
    const user = requireAuth(request);
    if (user.role.toLowerCase() !== "superadmin") {
        throw new Error("Forbidden: Super Admin access required");
    }
    return user;
}

