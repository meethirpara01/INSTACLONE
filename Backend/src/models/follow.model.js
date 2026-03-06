const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Followee is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"]
    }
}, {
    timestamps: true
});

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("Follows", followSchema);

module.exports = followModel;