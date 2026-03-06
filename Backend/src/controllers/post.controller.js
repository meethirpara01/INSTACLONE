const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function creatPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "INSTACLONE"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    });

    res.status(201).json({
        message: "Post Created Successfully",
        post
    });
}

async function getpostController(req, res) {

    const userId = req.user.id;
    const posts = await postModel.find({
        user: userId
    });

    res.status(201).json({
        message: "Posts Fetched Successfully",
        posts
    });
}

async function getPostDetailsController(req, res) {

    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isUserAuthorized = post.user.toString() === userId.toString();

    if (!isUserAuthorized) {
        return res.status(403).json({
            message: "Use not authorized"
        });
    }

    return res.status(201).json({
        message: "Post Fetched Successfully",
        post
    });
}

async function likePostController(req, res) {

    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found!"
        });
    }

    const likeRecored = await likeModel.create({
        post: postId,
        user: username
    });

    res.status(201).json({
        message: "You like this post",
        likeRecored
    })
}

async function unLikePostController(req, res) {

    const postId = req.params.postId;
    const username = req.user.username;

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    });

    if (!isLiked) {
        return res.status(404).json({
            message: "Post didn't like"
        });
    }

    await likeModel.findByIdAndDelete({ _id: isLiked._id });

    res.status(201).json({
        message: "Post unLiked Successfull"
    })
}

async function getFeedController(req, res) {

    const username = req.user.username;

    const posts = await Promise.all((await (await postModel.find().sort({ _id: -1 }).populate("user").lean()))
        .map(async (post) => {

            const isLiked = await likeModel.findOne({
                user: username,
                post: post._id
            });

            post.isLiked = !!isLiked; // Boolean
            return post
        }))

    res.status(200).json({
        message: "Posts fetched Successfully",
        posts
    })
}

module.exports = {
    creatPostController,
    getpostController,
    getPostDetailsController,
    likePostController,
    getFeedController,
    unLikePostController
}