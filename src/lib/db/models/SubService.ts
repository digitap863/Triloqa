import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface ISubService extends Document {
    parentServiceId: Types.ObjectId;
    title: string;
    slug: string;
    description: string;
    img: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const SubServiceSchema = new Schema<ISubService>(
    {
        parentServiceId: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure slug uniqueness per parent (optional safeguard)
SubServiceSchema.index({ parentServiceId: 1, slug: 1 }, { unique: true });

export default models.SubService || model<ISubService>("SubService", SubServiceSchema);
