import { Schema, model, Document } from "mongoose";
import { LangDocument, PersonDocument } from ".";
import { CommentDocument } from "./comment";

export interface IMovie {
    title: string;
    released: Date;
    plot: string;
    comments?: CommentDocument[];
    languages?: string[] | LangDocument[];
    director?: string[] | PersonDocument[];
    actors?: string[] | PersonDocument[];
    createdAt?: Date;
    updatedAt?: Date;
}

const movieSchema = new Schema<MovieDocument>(
    {
        title: { type: String, required: true },
        released: { type: Date },
        plot: { type: String },
        languages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Lang"
            }
        ],
        director: [
            {
                type: Schema.Types.ObjectId,
                ref: "Person"
            }
        ],
        actors: [
            {
                type: Schema.Types.ObjectId,
                ref: "Person"
            }
        ]
    },
    { timestamps: true }
);

movieSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "movie"
});

movieSchema.set("toJSON", {
    transform: (doc: MovieDocument, { __v, createdAt, updatedAt, ...rest }: { __v: number; createdAt: string; updatedAt: string; rest: any[] }, options: any) => rest
});

export interface MovieDocument extends IMovie, Document { }
export const Movie = model<MovieDocument>("Movie", movieSchema);
