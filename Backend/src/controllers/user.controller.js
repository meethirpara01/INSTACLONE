const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {

    const followerId = req.user.id;
    const followeeUsername = req.params.username;

    const followee = await userModel.findOne({ username: followeeUsername });

    if (!followee) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        });
    }

    if (followerId.toString() === followee._id.toString()) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }

    const followRecord = await followModel.findOne({
        follower: followerId,
        followee: followee._id
    });

    if (!followRecord) {

        const followRequest = await followModel.create({
            follower: followerId,
            followee: followee._id,
            status: "pending"
        });

        return res.status(201).json({
            message: `Follow request sent to ${followee.username}`,
            follow: followRequest
        });
    }

    if (followRecord.status === "pending") {
        return res.status(200).json({
            message: "Request already sent",
            follow: followRecord
        });
    }

    if (followRecord.status === "accepted") {
        return res.status(200).json({
            message: `You already follow ${followee.username}`,
            follow: followRecord
        });
    }

    if (followRecord.status === "rejected") {
        followRecord.status = "pending";
        await followRecord.save();

        return res.status(200).json({
            message: `Follow request sent again`,
            follow: followRecord
        });
    }
}

async function GetPendingRequestsController(req, res) {

    const followeeId = req.user.id;

    const pendingRequest = await followModel
        .find({
            followee: followeeId,
            status: "pending"
        })
        .populate("follower", "username profileImage");

    res.status(200).json({
        message: "Pending requests fetched",
        pendingRequests: pendingRequest
    });
}

async function AcceptRequestController(req, res) {

    const followeeId = req.user.id;
    const followerUsername = req.params.username;

    const follower = await userModel.findOne({ username: followerUsername });

    if (!follower) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const requestRecord = await followModel.findOne({
        follower: follower._id,
        followee: followeeId,
        status: "pending"
    });

    if (!requestRecord) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requestRecord.status = "accepted";
    await requestRecord.save();

    res.status(200).json({
        message: "Request accepted",
        requestRecord
    });
}

async function RejectRequestController(req, res) {

    const followeeId = req.user.id;
    const followerUsername = req.params.username;

    const follower = await userModel.findOne({ username: followerUsername });

    if (!follower) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const requestRecord = await followModel.findOne({
        follower: follower._id,
        followee: followeeId,
        status: "pending"
    });

    if (!requestRecord) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requestRecord.status = "rejected";
    await requestRecord.save();

    res.status(200).json({
        message: "Request rejected",
        requestRecord
    });
}

async function unFollowUserController(req, res) {

    const followerId = req.user.id;
    const followeeUsername = req.params.username;

    const followee = await userModel.findOne({ username: followeeUsername });

    if (!followee) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const followRecord = await followModel.findOne({
        follower: followerId,
        followee: followee._id
    });

    if (!followRecord) {
        return res.status(200).json({
            message: `No active follow relationship`
        });
    }

    await followRecord.deleteOne();

    res.status(200).json({
        message: `Unfollowed ${followee.username}`
    });
}

async function GetFollowersListController(req, res) {

    const followeeId = req.user.id;

    const followersList = await followModel
        .find({
            followee: followeeId,
            status: "accepted"
        })
        .populate("follower", "username profileImage bio");

    res.status(200).json({
        message: "Followers fetched successfully",
        followers: followersList
    });
}

async function GetFollowingListController(req, res) {

    const followerId = req.user.id;

    const followingList = await followModel
        .find({
            follower: followerId,
            status: "accepted"
        })
        .populate("followee", "username profileImage bio");

    res.status(200).json({
        message: "Following list fetched successfully",
        following: followingList
    });
}

async function GetSuggestedUsersController(req, res) {

    const currentUserId = req.user.id;

    // Only exclude accepted and pending relations
    const relations = await followModel.find({
        follower: currentUserId,
        status: { $in: ["accepted", "pending"] }
    });

    const excludedUserIds = relations.map(rel => rel.followee);

    excludedUserIds.push(currentUserId);

    const suggestedUsers = await userModel.find({
        _id: { $nin: excludedUserIds }
    })
        .select("username profileImage bio")
        .limit(10);

    res.status(200).json({
        message: "Suggested users fetched successfully",
        suggestions: suggestedUsers
    });
}

module.exports = {
    followUserController,
    GetPendingRequestsController,
    AcceptRequestController,
    RejectRequestController,
    unFollowUserController,
    GetFollowersListController,
    GetFollowingListController,
    GetSuggestedUsersController
}