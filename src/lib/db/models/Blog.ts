import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    slug: string;
    author: string;
    date: string;
    image: string;
    content: { heading: string; body: string }[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        author: {
            type: String,
            required: true,
            default: "Triloqa Team",
        },
        date: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        content: [
            {
                heading: { type: String, required: true },
                body: { type: String, required: true },
            },
        ],
        tags: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
