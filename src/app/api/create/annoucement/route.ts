import { NextResponse } from "next/server";
import Announcement from "@/lib/annoucement";
import Connection from "@/lib/connectDB";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    Connection();
    const body = await request.json();

    const { data, link, image, document, title, user } = body;
    console.log(body);

    const annoucement = await Announcement.create({
        data,
        link,
        title,
        image,
        document,
        user,
    });

    annoucement.save();
    return NextResponse.json(annoucement);
}
