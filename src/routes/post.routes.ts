import { Router } from "express";
import commentController from "../controllers/comment.controller";
import PostController from "../controllers/post.controller";
import saveController from "../controllers/save.controller";
import authorize from "../middleware/authorization.middleware";
import upload, { UploadType } from "../utils/upload";
import { validateCreatePost } from "../validator/post.validator";
import { validateCreateComment } from "../validator/comment.validator";

const router = Router();

/**
 *
 */
router.get("/", authorize, PostController.getPosts);

/**
 * Create Post
 *
 * @body [caption] string;
 * @body [image] file[];
 * @body [tags] string[];
 */
router.post(
  "/",
  authorize,
  upload("image", UploadType.MULTIPLE),
  validateCreatePost,
  PostController.postPost
);

/**
 * Get post
 *
 * @params id ObjectId [Post]
 *
 */
router.get("/:id", authorize, PostController.getPost);

/**
 * Delete post
 *
 * @params id ObjectId [Post]
 *
 */
router.delete("/:id", authorize, PostController.deletePost);

/**
 * Update post
 *
 * @params caption;
 * @params tags : string[];
 *
 */
router.post("/:id", authorize, validateCreatePost, PostController.updatePost);

router.post("/:id/like", authorize, PostController.likePost);
router.post("/:id/unlike", authorize, PostController.unlikePost);
router.post("/:id/save", authorize, saveController.postSave);
router.post("/:id/unsave", authorize, saveController.removeSave);
router.get("/:id/comments", authorize, commentController.getComments);
router.post(
  "/:id/comments",
  authorize,
  validateCreateComment,
  commentController.postComment
);

export default router;
