import express, { Express } from "express";
import { notFound, serverError } from "./middleware";
import { homeRoute } from "./routes";
import { movieRoute } from "./routes/movie";

export const createApp = (): Express => {
    const app = express();
    app.use(express.json());

    app.use("/", homeRoute);
    app.use("/movies", movieRoute);

    app.use(notFound);
    app.use(serverError);

    return app;
};
