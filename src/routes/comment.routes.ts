import { Router } from "express";
import commentController from "src/controllers/comment.controller";

const router = Router();

router.get("/:id", commentController.getComment);
router.delete("/:id", commentController.deleteComment);
router.put("/:id", commentController.updateComment);
export default router;
