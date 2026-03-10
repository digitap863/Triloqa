import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IService extends Document {
    title: string;
    slug: string;
    description: string;
    img1: string;
    img2: string;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
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
        description: {
            type: String,
            required: true,
        },
        img1: {
            type: String,
            required: true,
        },
        img2: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default models.Service || model<IService>("Service", ServiceSchema);
