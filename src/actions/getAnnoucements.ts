import Announcement from "@/lib/annoucement";
import Connection from "@/lib/connectDB";
import { Annoucement } from "@/types";

export const getAnnoucements = async () => {
    try {
        Connection();

        const annoucements = await Announcement.find({})
            .populate("user")
            .sort({ createdAt: -1 });
        console.log(annoucements);
        return annoucements as Annoucement[];
    } catch (error) {
        return [];
    }
    return [];
};
