import User from "../models/User.js";
import Badge from '../models/Badge.js';
import generateToken from "../utils/generateToken.js";
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!email || !role || !password) {
        throw new ApiError(401, "Mention field is required")
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(404, "User already exists")
    }
    const user = await User.create({
        username,
        email,
        password,
        role,
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }
    return res
        .status(201)
        .json(
            new ApiResponse(201, {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                points: user.points,
                badges: user.badges,
                token: generateToken(user._id)
            }, "User created successfully")
        )
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(401, "Email and password are required")
    }

    const user = await User.findOne({ email}).select('+password');

    if(!user){
        throw new ApiError(404, "User not found")
    }


    const isMatch = await user.matchPassword(password);
    if (!isMatch) {        throw new ApiError(401, "Invalid credentials");
    }

    // Check for initial badges for new users (e.g., "First Login" badge)
    // This logic might be better placed in the registerUser function or a dedicated badge awarding service
    // For demonstration, let's assume a "First Login" badge exists and is awarded here if not already
    const firstLoginBadge = await Badge.findOne({ criteria: "First Login" });
    if (firstLoginBadge && !user.badges.includes(firstLoginBadge._id)) {
        user.badges.push(firstLoginBadge._id);
        await user.save();
    
        throw new ApiError(401, "Invalid credentials")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                points: user.points,
                badges: user.badges,
                token: generateToken(user._id),
            }, "Login successful")
        );
});

const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await User.findById(userId).populate('badges', "name description icon")
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res 
        .json(
            new ApiResponse(201, {
                _id: user._id,
                username: user.username,
                email:user.email,
                role: user.role,
                points: user.points,
                badges: user.badges
            }, "Profile fetched successfully")
        );
});



export {
    registerUser,
    loginUser,
    getProfile
}