import { body } from "express-validator";

export const validatorLoginInput = () => {
  return [
    body("username")
      .exists()
      .withMessage("username or email doesn't exist")
      .trim(),

    body("password").exists().withMessage("password doesn't exist").trim(),
  ];
};

export const validateEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return email.match(regex);
};

export default {
  validatorLoginInput,
  validateEmail,
};
