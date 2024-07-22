import { NextFunction, Request, Response, Router } from "express";
import {
  validateRegisterInput,
  validateUpdateProfile,
} from "../validator/user.validator";
import UserController from "../controllers/user.controller";
import FollowController from "../controllers/follow.controller";
import saveController from "../controllers/save.controller";
import authorize from "../middleware/authorization.middleware";
const router = Router();

/**
 * Visibility : Protected
 * Get profile user
 * Success : 201
 * Error : 401, 400, 500
 */
router.get("/", authorize, UserController.getUser);

/**
 * Visibility : Protected
 * @property username;
 * @property email;
 * @property name;
 * Success : 200
 * Error : 401, 400, 500
 */
router.put("/", authorize, validateUpdateProfile, UserController.updateProfile);

/**
 * Visibility : Public
 * Register
 * @property caption
 * @property tags
 * @property image
 * Success : 201
 * Error : 401, 400, 500
 */
router.post("/register", validateRegisterInput, UserController.postUser);

/**
 * Get the user data
 * @params [username] string Post;
 *
 */
router.get("/:username", UserController.getUsername);

/**
 * Get another user post
 * @params [username] string Post;
 */
router.get("/:username/posts", UserController.getUserPost);

/**
 *
 * Follow user
 * @params [username] : User
 *
 */
router.post("/:username/follow", FollowController.postFollow);

/**
 *
 * Unfollow user
 * @params [username] : User
 *
 */
router.post("/:username/unfollow", FollowController.postUnFollow);

/**
 *
 * Get followers
 * @params [username] : User
 *
 */
router.get("/:username/followers", FollowController.getFollowers);

/**
 *
 * Get following
 * @params [username] : User
 *
 */
router.get("/:username/following", FollowController.getFollowing);

router.get("/savedposts", saveController.getSaves);

export default router;
