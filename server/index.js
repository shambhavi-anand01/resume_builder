const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const session = require("express-session");

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors(
  {
    // origin: ["http://localhost:5173", "https://resume-template-navy.vercel.app", 
    //          "https://resume-template-shambhavi-anands-projects.vercel.app", 
    //          "https://resume-template-git-main-shambhavi-anands-projects.vercel.app"],
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  }
)); // Enable CORS
// app.use(session({
//   secret: "yourSecretKey",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: true, // Set to false if using HTTP (local dev)
//     sameSite: "none", // Required for cross-origin cookies
//     httpOnly: true
//   }
// }));
// Import Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes); // Mount auth routes

// Start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
