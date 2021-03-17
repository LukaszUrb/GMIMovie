import { Schema, model, Document } from "mongoose";
import { MovieDocument } from "./movie";

export interface IComment {
    content: string;
    creator: string;
    movie: string | MovieDocument;
    createdAt?: Date;
    updatedAt?: Date;
}

const commentSchema = new Schema<CommentDocument>(
    {
        content: { type: String, required: true },
        creator: { type: String, required: true },
        movie: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
            required: true
        }
    },
    { timestamps: true }
);

commentSchema.set("toJSON", {
    transform: (doc: CommentDocument, { __v, _id, ...rest }: { __v: number; _id: string; rest: any[] }, options: any) => rest
});

export interface CommentDocument extends IComment, Document { }
export const Comment = model<CommentDocument>("Comment", commentSchema);
