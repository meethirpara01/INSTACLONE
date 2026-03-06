const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

// REQUIRE ROUTES
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const userRoute = require("./routes/user.routes");
// const userRoute = require("./routes/user.routes");

// USING ROUTE
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

module.exports = app;