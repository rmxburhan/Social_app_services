import { body } from "express-validator";

export const validateCreateComment = [
  body("body")
    .exists()
    .withMessage("comment message cannot be empty")
    .isString()
    .withMessage("coment message must be a string")
    .isLength({ max: 1024 })
    .withMessage("coment message cannot contain more than 1024 character"),
];
