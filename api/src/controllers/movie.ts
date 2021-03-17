import { Response, NextFunction, Request } from "express";
import { Movie, MovieDocument, Comment, IMovie } from "../models";
import { RequestComment, RequestMovie, RequestParamsId } from "../globals";
import { optionalIdValidSchema, titleValidSchema, validate, commentValidSchema, idValidSchema } from "../validation";
import { BadRequest, NotFound } from "../errors";
import { ombdApi } from "../services";
import { populateEntity } from "../utils";

export const createMoviesController = async ({ query }: RequestMovie, res: Response, next: NextFunction): Promise<Response> => {
    await validate(titleValidSchema, query);

    const
        title = query.title,
        movie = await ombdApi.fetchMovie(title),
        foundDoc = await Movie.findOne({ title: movie.title });

    if (foundDoc) throw new BadRequest(`${foundDoc.title} movie already exists in database. (id: ${foundDoc.id})`);

    const movieDoc = await Movie.create(movie);

    await populateEntity<IMovie, MovieDocument>(["languages", "actors", "director"], movieDoc);

    return res.status(201).json(movieDoc);
};

export const getMoviesController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    await validate(optionalIdValidSchema, req.query);

    const id = req.query.id;

    if (id) {
        const movieDoc = await Movie.findById(id);

        if (!movieDoc) throw new NotFound("Movie not found.");

        await populateEntity<IMovie, MovieDocument>(["languages", "actors", "director"], movieDoc);

        return res.json(movieDoc);
    }

    const movieDocs = await Movie.find();

    for (const movieDoc of movieDocs) {
        await populateEntity<IMovie, MovieDocument>(["languages", "actors", "director"], movieDoc);
    }

    return res.json(movieDocs.length > 0 ? movieDocs : { message: "No movies in database." });
};

export const createCommentController = async ({ params, body }: RequestComment, res: Response, next: NextFunction): Promise<Response> => {
    await validate(commentValidSchema, { params, body });
    const
        { creator, content } = body,
        movieId = params.id;

    const movieDoc = await Movie.findById(movieId);

    if (!movieDoc) throw new NotFound("This movie does not exist.");

    const commentDoc = await Comment.create({
        content,
        creator,
        movie: movieId
    });

    return res.status(201).json(commentDoc);
};

export const getCommentsController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const commentDocs = await Comment.find();

    return res.json(commentDocs.length > 0 ? commentDocs : { message: "No comments in database." });
};

export const getMoviesCommentsController = async (req: RequestParamsId, res: Response, next: NextFunction): Promise<Response> => {
    await validate(idValidSchema, req.params);

    const
        movieId = req.params.id,
        movieDoc = await Movie.findById(movieId);

    if (!movieDoc) throw new NotFound("This movie does not exist.");

    const commentDocs = await Comment.find({ movie: movieDoc.id });

    return res.json(commentDocs.length > 0 ? commentDocs : { message: "This movie does not have any comments yet." });
};