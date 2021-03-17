import { Schema, model, Document } from "mongoose";

export interface ILang {
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const langSchema = new Schema<LangDocument>(
    {
        name: { type: String, required: true }
    },
    { timestamps: true }
);

langSchema.set("toJSON", {
    transform: (doc: LangDocument, { __v, _id, createdAt, updatedAt, ...rest }: { __v: number; _id: string; createdAt: string; updatedAt: string; rest: any[] }, options: any) => rest
});

export interface LangDocument extends ILang, Document { }
export const Lang = model<LangDocument>("Lang", langSchema);
