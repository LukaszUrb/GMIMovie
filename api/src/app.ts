import express, { Express } from "express";
import { notFound, serverError } from "./middleware";
import { homeRoute } from "./routes";


export const createApp = (): Express => {
    const app = express();
    app.use(express.json());

    app.use("/", homeRoute);

    app.use(notFound);
    app.use(serverError);

    return app;
}; 