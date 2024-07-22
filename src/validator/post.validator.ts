import { body } from "express-validator";

export const validateCreatePost = [
  body("caption")
    .optional()
    .isLength({ max: 1024 })
    .withMessage("caption must be less than 1024 characters"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("tags must be an array of userid"),
];
