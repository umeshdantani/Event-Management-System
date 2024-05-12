import jwt from 'jsonwebtoken';
import User from "../models/user.js"
import ApiResponse from "../utils/ApiResponse.js"

const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token)
        return res.status(403).json(
            new ApiResponse(403, [], "Access to the requested resource is forbidden")
        );

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id);

        if (!user)
            return res.status(403).json(new ApiResponse(403, [], "Invalid Token"));

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json(new ApiResponse(403, [], "Invalid Token"));
    }
};

export default verifyToken;