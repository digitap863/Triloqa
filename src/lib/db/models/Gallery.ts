import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IGallery extends Document {
    title: string;
    image: string;
    video: string;
    mediaType: "image" | "video";
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
            default: "",
            required: false,
        },
        video: {
            type: String,
            default: "",
            required: false,
        },
        mediaType: {
            type: String,
            enum: ["image", "video"],
            default: "image",
            required: false,
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

// This ensures the model is updated if we change the schema in development
if (models.Gallery) {
    delete (mongoose as any).models.Gallery;
}

export default model<IGallery>("Gallery", GallerySchema);
