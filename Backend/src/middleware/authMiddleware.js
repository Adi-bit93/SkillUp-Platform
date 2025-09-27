import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const protect = asyncHandler(async (req, res, next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, "Invalid token")
        }
        req.user = user;
        next();

    } catch (err) {
        throw new ApiError(401, err?.message || "Invalid access token")
    }
})