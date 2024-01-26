import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    semester: {
        type: String,
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

export default Class;
