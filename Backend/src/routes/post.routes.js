const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");

const postroute = express.Router();


postroute.post("/", upload.single("image"), identifyUser, postController.creatPostController);

postroute.get("/", identifyUser, postController.getpostController);

postroute.get("/detail/:postId", identifyUser, postController.getPostDetailsController);

postroute.post("/like/:postId", identifyUser, postController.likePostController);

postroute.post("/unlike/:postId", identifyUser, postController.unLikePostController);

postroute.get("/feed", identifyUser, postController.getFeedController);

module.exports = postroute; 