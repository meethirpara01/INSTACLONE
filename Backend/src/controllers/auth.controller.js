const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlredyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlredyExist) {
        res.status(409).json({
            Message: "User Alredy Exist With This " + (isUserAlredyExist.email ? "Emial" : "Username")
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    });

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("JWT_TOKEN", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });

    res.status(201).json({
        message: "User register Suucessfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        },
        token
    });
}


async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    }).select("+password");

    if (!user) {
        res.status(409).json({
            message: "User Not Found"
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        res.status(409).json({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("JWT_TOKEN", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });

    res.status(201).json({
        message: "User Login Suucessfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        },
        token
    });
}

async function getMeController(req, res) {

    const userId = req.user.id;
    const user = await userModel.findById(userId);

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}

async function logoutController(req, res) {

    res.clearCookie("JWT_TOKEN");

    res.status(200).json({
        message: "User logged out successfully"
    });
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}