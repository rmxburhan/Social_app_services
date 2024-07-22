import { Router } from "express";
import commentController from "src/controllers/comment.controller";
import PostController from "src/controllers/post.controller";
import saveController from "src/controllers/save.controller";
import { validateCreatePost } from "src/validator/post.validator";

const router = Router();

/**
 *
 */
router.get("/", PostController.getPosts);

/**
 * Create Post
 *
 * @body [caption] string;
 * @body [image] file[];
 * @body [tags] string[];
 */
router.post("/", validateCreatePost, PostController.postPost);

/**
 * Get post
 *
 * @params id ObjectId [Post]
 *
 */
router.get("/:id", PostController.getPost);

/**
 * Delete post
 *
 * @params id ObjectId [Post]
 *
 */
router.delete("/:id", PostController.deletePost);

/**
 * Update post
 *
 * @params body;
 * @params image;
 *
 */
router.post("/:id", validateCreatePost, PostController.updatePost);

router.post("/:id/like", PostController.likePost);
router.post("/:id/unlike", PostController.unlikePost);
router.post("/:id/save", saveController.postSave);
router.post("/:id/unsave", saveController.removeSave);
router.post("/:id/comments", validateCreatePost, commentController.postComment);

export default router;
