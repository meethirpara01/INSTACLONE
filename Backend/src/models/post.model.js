const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        require: [true, "imgUrl is require for creating an post"]
    },
    user: {
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "User id is required"]
    }
});

const postModel = mongoose.model("Posts", postSchema);
module.exports = postModel;