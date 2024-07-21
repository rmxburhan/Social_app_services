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

export default {
  validatorLoginInput,
};
