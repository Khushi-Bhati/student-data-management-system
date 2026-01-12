import mongoose from "mongoose";

const Studentschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        enrollmentDate: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)

export const Studentmodel = mongoose.model("student", Studentschema)