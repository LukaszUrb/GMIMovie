import { RequestHandler } from "express";

export const homeController: RequestHandler = async (req, res) => {
    res.send("Welcome to GMI Movie App! Please check the request config at <a href=https://github.com/LukaszUrb/GMIMovie>GitHub</a>");
};
