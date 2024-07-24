import { NextFunction, Request, Response } from "express";
import FollowService from "../services/follow.service";
import UserService from "../services/user.service";
import RequestAuth from "../types/Request";

export const postFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = (req as RequestAuth).user;
    const followUserData = await UserService.findUserBy("username", username);
    if (!followUserData) {
      const error = new Error();
      error.name = "NotFound";
      error.message = "Username not found";
      next(error);
      return;
    }

    if (followUserData.id === user.id) {
      const error = new Error();
      error.name = "Forbidden";
      error.message = "Can't follow yourself";
      next(error);
      return;
    }

    let followed = await FollowService.findFollow({
      followerId: user.id,
      followingId: followUserData.id,
    });

    if (followed) {
      const error = new Error();
      error.name = "BadRequest";
      error.message = "Already follwed user";
      next(error);
      return;
    }

    const newFollow = FollowService.createFollow({
      followingId: followUserData.id,
      followerId: user.id,
    });

    FollowService.saveFollow(newFollow);

    return res.status(200).json({
      message: `Success following ${username}`,
    });
  } catch (error) {
    next(error);
  }
};

export const postUnFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const { username } = req.params;

    const userFollowingData = await UserService.findUserBy(
      "username",
      username
    );
    if (!userFollowingData) {
      const error = new Error();
      error.name = "NotFound";
      error.message = "Username not found";
      next(error);
      return;
    }

    if (userFollowingData.id === user.id) {
      const error = new Error();
      error.name = "Forbidden";
      error.message = "Can't unfollow yourself";
      next(error);
      return;
    }

    const followingData = await FollowService.findFollow({
      followingId: userFollowingData.id,
      followerId: user.id,
    });

    if (!followingData) {
      const error = new Error();
      error.name = "NotFound";
      error.message = "You are not following " + username;
      next(error);
      return;
    }

    await FollowService.deleteFollow(followingData.id);
    return res.status(200).json({
      message: "Unfollow " + username + " success.",
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;

    const userData = await UserService.findUserBy("username", username);
    if (!userData) {
      const error = new Error();
      error.name = "NotFound";
      error.message = "User not found";
      next(error);
      return;
    }

    const followers = await FollowService.getFollowers(userData.id);

    return res.status(200).json({
      message: "Followers data from " + username + " success retrieved.",
      data: followers,
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;

    const user = await UserService.findUserBy("username", username);
    if (!user) {
      const error = new Error();
      error.name = "NotFound";
      error.message = "Username not found";
      next(error);
      return;
    }

    const following = await FollowService.getFollowing(user.id);

    return res.status(200).json({
      message: "Following data from " + username + " success retrieved,",
      data: following,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  postFollow,
  getFollowers,
  getFollowing,
  postUnFollow,
};
