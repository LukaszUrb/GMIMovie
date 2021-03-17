import { Schema, model, Document } from "mongoose";
import { CommentDocument } from "./comment";

export interface IMovie {
    title: string;
    released: string;
    plot: string;
    comments?: CommentDocument[];
    languages?: string[];
    director?: string[];
    actors?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const movieSchema = new Schema<MovieDocument>(
    {
        title: { type: String, required: true },
        released: { type: String },
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
