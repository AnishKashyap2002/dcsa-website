import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subject: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    total_classes: {
        type: Number,
        default: 0,
    },
    attended_classes: {
        type: Number,
        default: 0,
    },
});

const Attendence =
    mongoose.models.Attendence ||
    mongoose.model("Attendence", attendenceSchema);

export default Attendence;
