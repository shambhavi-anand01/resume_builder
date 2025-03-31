// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const authMiddleware = (req, res, next) => {
//     let token = req.header("Authorization");
//     console.log("🔍 Incoming Token:", token);
//     if (!token) {
//         console.log("❌ No token found in headers!");
//         return res.status(401).json({ msg: "No token, authorization denied" });
//     }

//     try {
//         if (token.startsWith("Bearer ")) {
//             token = token.slice(7, token.length).trim();
//         }else{
//             console.log("❌ Token does not start with 'Bearer '");
//             return res.status(401).json({ msg: "Invalid token format" });
//         }

//         console.log("📢 Extracted Token:", token);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user ID to request
//         next();
//     } catch (err) {
//         console.error("❌ Token Verification Error:", err.message);
//         res.status(401).json({ msg: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;






const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");
    console.log("🔍 Incoming Token:", token);

    if (!token) {
        console.log("❌ No token found in headers!");
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        } else {
            console.log("❌ Token does not start with 'Bearer '");
            return res.status(401).json({ msg: "Invalid token format" });
        }

        console.log("📢 Extracted Token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user ID to request
        next();
    } catch (err) {
        console.error("❌ Token Verification Error:", err.message);
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;
