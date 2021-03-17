import { Schema, model, Document } from "mongoose";

type Role = "actor" | "director";
export interface IPerson {
    name: string;
    role?: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

const personSchema = new Schema<PersonDocument>(
    {
        name: { type: String, required: true },
        role: { type: String }
    },
    { timestamps: true }
);

personSchema.set("toJSON", {
    transform: (doc: PersonDocument, { __v, _id, createdAt, updatedAt, role, ...rest }: { __v: number; _id: string; createdAt: string; updatedAt: string; role: string; rest: any[] }, options: any) => rest
});

export interface PersonDocument extends IPerson, Document { }
export const Person = model<PersonDocument>("Person", personSchema);
