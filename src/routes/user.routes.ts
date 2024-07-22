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
 * Visibility : Protected
 * Get account post
 * Success : 200
 * Error : 401, 500
 */
router.get("/savedposts", authorize, saveController.getSaves);

/**
 * Visibility : Protected
 * Get account data
 * @params username
 * Success : 200
 * Error : 404, 401, 400, 500
 */
router.get("/:username", authorize, UserController.getUsername);

/**
 * Get another user post
 * @params [username] string Post;
 */
router.get("/:username/posts", authorize, UserController.getUserPost);

/**
 * Visibility : Protected
 * Follow account
 * @params username
 * Success : 200
 * Error : 404, 401, 400, 500
 */
router.post("/:username/follow", authorize, FollowController.postFollow);

/**
 * Visibility : Protected
 * Unollow account
 * @params username
 * Success : 200
 * Error : 404, 401, 400, 500
 */
router.post("/:username/unfollow", authorize, FollowController.postUnFollow);

/**
 *
 * Get followers
 * @params [username] : User
 *
 */
router.get("/:username/followers", authorize, FollowController.getFollowers);

/**
 *
 * Get following
 * @params [username] : User
 *
 */
router.get("/:username/following", authorize, FollowController.getFollowing);

export default router;
