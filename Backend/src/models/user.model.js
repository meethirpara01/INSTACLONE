const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username is alredy taken"],
        reqired: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email is alredy taken"],
        reqired: [true, "Email is required"]
    },
    password: {
        type: String,
        reqired: [true, "Password is required"],
        select: false
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/meet00/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg?updatedAt=1771887722491"    
    }
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;