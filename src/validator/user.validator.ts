import { body } from "express-validator";

export const validateRegisterInput = () => {
  return [
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
};

export const validateLoginInput = () => {
  return [
    body("username").exists().withMessage("username doesn't exist").trim(),

    body("password")
      .exists()
      .withMessage("password doesn't exist")
      .isLength({ min: 6, max: 50 })
      .withMessage("password input is invalid")
      .trim(),
  ];
};

export default {
  validateRegisterInput,
};
