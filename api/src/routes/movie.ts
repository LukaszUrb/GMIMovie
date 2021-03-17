import { Router } from "express";
import { createCommentController, createMoviesController, getCommentsController, getMoviesCommentsController, getMoviesController, homeController } from "../controllers";
import { catchAsync } from "../middleware";

const router = Router();

router.post("/add", catchAsync(createMoviesController));

router.get("/", catchAsync(getMoviesController));

router.post("/:id/comments/add", catchAsync(createCommentController));

router.get("/:id/comments", catchAsync(getMoviesCommentsController));

router.get("/comments", catchAsync(getCommentsController));

export { router as movieRoute };
