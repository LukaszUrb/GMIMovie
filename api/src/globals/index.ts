import { Request } from "express";

export interface RequestParamsId extends Request {
    params: {
        id?: string;
    };
}

export interface RequestMovie extends Request {
    query: {
        title?: string;
    };
}

export interface RequestComment extends Request {
    params: {
        id?: string;
    };
    body: {
        content?: string;
        creator?: string;
    };
}
