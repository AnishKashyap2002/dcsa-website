import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
});

const Subject =
    mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
