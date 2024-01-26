import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        title: {
            requried: true,
            type: String,
        },
        data: {
            type: String,
            requried: true,
        },
        image: String,
        document: String,
        link: String,
    },
    {
        timestamps: true,
    }
);

const Announcement =
    mongoose.models.Announcement ||
    mongoose.model("Announcement", announcementSchema);

export default Announcement;
