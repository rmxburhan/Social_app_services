import { body } from "express-validator";

export const validateRegisterInput = [
  body("name")
    .exists()
    .withMessage("name doesn't exist")
    .isLength({ min: 5, max: 255 })
    .trim(),
  body("username").exists().withMessage("username doesn't exist").trim(),
  body("email").exists().withMessage("email doesn't exist").trim(),
  body("password")
    .exists()
    .withMessage("password doesn't exist")
    .isLength({ min: 6, max: 50 })
    .withMessage("password input is invalid")
    .trim(),
];

export const validateUpdateProfile = () => [
  body("name").optional().isLength({ min: 5, max: 255 }),
  body("username").optional(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("email format is invalid")
    .normalizeEmail(),
];

export default {
  validateRegisterInput,
};
