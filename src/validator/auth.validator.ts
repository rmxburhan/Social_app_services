import { body } from "express-validator";

export const validatorLoginInput = [
  body("username")
    .exists()
    .withMessage("username or email doesn't exist")
    .trim(),

  body("password").exists().withMessage("password doesn't exist").trim(),
];

export const validateEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return email.match(regex);
};

export const validateResetPassword = [
  body("oldPassword")
    .exists()
    .withMessage("old password doesn't exist")
    .isString()
    .withMessage("old passwod must be a string")
    .isLength({ min: 6, max: 50 })
    .withMessage("a password can only contain 6 to 50 character")
    .trim(),
  body("newPassword")
    .exists()
    .withMessage("new password doesn't exist")
    .isString()
    .withMessage("new password must be a string")
    .isLength({ min: 6, max: 50 })
    .withMessage("a password can only contain 6 to 50 character")
    .trim(),
];

export default {
  validatorLoginInput,
  validateEmail,
};
