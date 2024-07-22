import { Router } from "express";
import commentController from "../controllers/comment.controller";
import { validateCreateComment } from "../validator/comment.validator";
import authorize from "../middleware/authorization.middleware";

const router = Router();

router.get("/:id", authorize, commentController.getComment);

router.post("/:id/reply", authorize, commentController.replyComment);

router.delete("/:id", authorize, commentController.deleteComment);

router.put(
  "/:id",
  authorize,
  validateCreateComment,
  commentController.updateComment
);
export default router;
