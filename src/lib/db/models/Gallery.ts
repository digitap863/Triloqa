import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IGallery extends Document {
    title: string;
    image: string;
    category: string;
    date: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default models.Gallery || model<IGallery>("Gallery", GallerySchema);
