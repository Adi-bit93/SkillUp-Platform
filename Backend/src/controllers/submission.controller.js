import mongoose from "mongoose";
import Submission from "../models/Submission.js";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createSubmission = asyncHandler(async (req, res, next) => {
    const { challengeId, proof } = req.body;

    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
        throw new ApiError(400, "Invalid challenge ID format")
    }

    const challenge = await Challenge.findById(challengeId);

    if (!challenge){
        throw new ApiError(404, "Challenge not found")
    }

    const submission = await Submission.create({
        student: req.user._id,
        challenge: challengeId,
        proof,
        status: "pending"
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, submission, "Submission created, awaiting review")
        );
});

const reviewSubmission = asyncHandler(async (req, res, next) => {
    const {status} = req.body;
    const submission = await Submission.findById(req.params.id).populate("challenge");

    if (!submission) {
        throw new ApiError(404, "Submission not found");
    }

    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Status must be 'approved' or 'rejected'");
    }

    if (status === "approved") {
        submission.pointsAwarded = submission.challenge.points
    }

    const student = await User.findById(submission.student);
    student.points += submission.challenge.points;
    await student.save();

    const earnedBadges = await Badge.find({});
    for (let badge of earnedBadges) {
        if(badge.criteria.includes("points")){
            const requiredPoints = parseInt(badge.criteria.split(" ")[0]);// Example: "100 points"
            if (student.points >= requiredPoints && !student.badges.includes(badge._id))  {
                student.badges.push(badge.id);
                await student.save();
            }
        }
    }
    await submission.save();

    return res 
        .status(200)
        .json(
            new ApiResponse(200, submission, `Submission ${status} successfully`)
        )
});

const getAllSubmissions = asyncHandler(async (req, res, next) => {
    const submissions = await Submission.find()
        .populate("student", "name email")
        .populate("challenge", "title points");

        return res 
            .status(200)
            .json(
                new ApiResponse(200, submissions, "Submissions fetched successfully")
            )
});

const getMySubmissions = asyncHandler(async (req, res, next) => {
    const submissions = await Submission.find({ student: req.user._id}).populate("challenge", "title points");

    return res 
        .status(200)
        .json(
            new ApiResponse(200, submissions,  "Your submissions fetched successfully")
        );
})

export {
    createSubmission,
    reviewSubmission,
    getAllSubmissions,
    getMySubmissions

}