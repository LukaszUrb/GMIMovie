import { RequestHandler } from "express";

export const homeController: RequestHandler = async (req, res) => {
    res.send("Welcome to Movie Api! Please check the request config at <a href=https://github.com/LukaszUrb/MovieApi>GitHub</a>");
};
