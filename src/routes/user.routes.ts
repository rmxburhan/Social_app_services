import { Router } from "express";
import { validateRegisterInput } from "..//validator/user.validator";
import UserController from "../controllers/user.controller";
import FollowController from "src/controllers/follow.controller";
import saveController from "src/controllers/save.controller";
const router = Router();

/**
 * Get user profile
 *
 */
router.get("/", UserController.getUser);

/**
 * update user profile
 */
router.post("/", UserController.updateProfile);

/**
 * Register
 * @body [name]
 * @body [email]
 * @body [usrname]
 * @body [password]
 * Success : 201
 */
router.post("/register", validateRegisterInput(), UserController.postUser);

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
