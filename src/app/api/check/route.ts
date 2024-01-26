import { NextResponse, NextRequest } from "next/server";
import Connection from "@/lib/connectDB";
import bcrypt from "bcrypt";

import User from "@/lib/user";

Connection();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse("Missing Info");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            hashedPassword,
        });

        user.save();

        return NextResponse.json(user);
    } catch (error) {
        console.log("error", "registration error");

        return new NextResponse("Internal Error", { status: 400 });
    }
}

export async function GET(request: NextResponse) {
    return new NextResponse("good to go", { status: 201 });
}
