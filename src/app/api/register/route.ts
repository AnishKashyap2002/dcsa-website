import { NextResponse, NextRequest } from "next/server";
import Connection from "@/lib/connectDB";
import bcrypt from "bcrypt";

import User from "@/lib/user";

Connection();

export async function POST(request: Request) {
    try {
        // console.log("it came", await request.json());
        const body = await request.json();
        const { email, username, password } = body;
        // console.log(body);

        // console.log("it has happened");
        if (email == "" || username == "" || password == "") {
            // console.log("Came here");
            return new NextResponse("Internal Error", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 12);
        console.log(username, email, hashedPassword);
        const user = await User.create({
            name: username,
            email: body.email,
            hashedPassword: hashedPassword,
        });

        console.log("User created", user);

        user.save();

        return NextResponse.json(user);
    } catch (error) {
        console.log(error, "registration error");

        return new NextResponse("Internal Error", { status: 400 });
    }
}

export async function GET(request: NextResponse) {
    return new NextResponse("good to go", { status: 201 });
}
