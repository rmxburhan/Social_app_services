import { Router } from "express";
import commentController from "src/controllers/comment.controller";
import { validateCreateComment } from "src/validator/comment.validator";

const router = Router();

router.get("/:id", commentController.getComment);

router.delete("/:id", commentController.deleteComment);

router.put("/:id", validateCreateComment, commentController.updateComment);
export default router;
