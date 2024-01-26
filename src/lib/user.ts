import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },

    bio: {
        type: String,
    },
    image: String,
    semester: String,

    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
    roll_no: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
