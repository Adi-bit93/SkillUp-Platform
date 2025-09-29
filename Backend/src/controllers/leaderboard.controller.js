import Leaderboard from "../models/Leaderboard.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getGlobalLeaderboard = asyncHandler(async (req, res, next) => {
    const topStudents = await User.find({ role: "student" })
        .sort({ points: -1}) // highest first
        .limit(20) //Top 20 
        .select("username email points badges"); // select only necessary fields

        return res
            .status(200)
            .json(
                new ApiResponse(200, topStudents, "Global leaderboard fetched successfully ")
            )
});

const getSchoolLeaderboard = asyncHandler(async (req, res, next) => {
    const { schoolId} = req.params;

    if(!schoolId){
        throw new ApiError(400, "School ID is required");
    }

    const topStudents = await User.find({ role: "student", school : schoolId })
        .sort({ points: -1})
        .limit(20)
        .select("name email points badges");

        return res 
            .status(200)
            .json(
                new ApiResponse(200, topStudents, "School leaderboard fetched successfully")
            );
})

const getMyRank = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    
    const student = await User.findById(userId);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    const betterStudentsCount = await User.countDocuments({
        role: "student",
        points: { $gt: student.points }
    });

    const rank = betterStudentsCount + 1;
    return res 
        .status(200)
        .json(
            new ApiResponse(200, { rank, points: student.points }, "student rank fetched successfully")
        );
});

export {
    getGlobalLeaderboard,
    getSchoolLeaderboard,
    getMyRank
}