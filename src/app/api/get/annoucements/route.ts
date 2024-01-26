import Connection from "@/lib/connectDB";
import Announcement from "@/lib/annoucement";
import { NextResponse } from "next/server";
export async function GET() {
    Connection();

    const annoucements = await Announcement.find({})
        .populate("user")
        .sort({ createdAt: -1 });
    console.log(annoucements);

    return NextResponse.json(annoucements);
}
