import { Joi } from "./joi";

export const titleValidSchema = Joi.object({
    title: Joi.string().required()
});

export const commentValidSchema = Joi.object({
    params: Joi.object({
        id: Joi.objectId().required()
    }),
    body: Joi.object({
        content: Joi.string().required(),
        creator: Joi.string().required()
    })
});
