const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRoute = express.Router();


userRoute.post("/follow/:username", identifyUser, userController.followUserController);

userRoute.get("/PendingReq", identifyUser, userController.GetPendingRequestsController);

userRoute.post("/accept/:username", identifyUser, userController.AcceptRequestController);

userRoute.post("/reject/:username", identifyUser, userController.RejectRequestController);

userRoute.post("/unfollow/:username", identifyUser, userController.unFollowUserController);

userRoute.get("/followersList", identifyUser, userController.GetFollowersListController);

userRoute.get("/followingList", identifyUser, userController.GetFollowingListController);

userRoute.get("/suggestedusers", identifyUser, userController.GetSuggestedUsersController);

module.exports = userRoute;