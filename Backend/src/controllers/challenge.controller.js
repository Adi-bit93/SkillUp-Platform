import Challenge from "../models/Challenge.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const createChallenge = asyncHandler(async (req, res, next) =>{
    const { title, description, type, proofType, points } = req.body;
    
    if (!title || !description || !proofType) {
        throw new ApiError(400, "Title, description and proofType are required");
    }

    const challenge = await Challenge.create({
        title, 
        description,
        type,
        proofType,
        points,
        createdBy: req.user._id
    });

    if (!challenge) {
        throw new ApiError(404, "Challenge not found")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, challenge, "Challenge created successfully")
        )
})

const getChallengesById = asyncHandler(async (req, res, next) => {
    const challenge = await Challenge.findById(req.params.id).populate('createdBy', 'name role email');

    if (!challenge) {
        throw new ApiError(404, "Challenge not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, challenge, "Challenge fetched successfully")
        ) 
})

const getChallenges = asyncHandler(async (req, res, next) => {
    const challenges = (await Challenge.find({isActive: true})).sort({createdAt: -1});
    return res 
        .status(200)
        .json(
            new ApiResponse(200, challenges, "Challenges fetched Successfully")
        );
})

const updateChallenge = asyncHandler(async (req, res, next) => {
    const { title, description, type, proofType, points, isActive} = req.body;
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
        throw new ApiError(404, "Challenge not found");
    }

    challenge.title = title || challenge.title;
    challenge.description = description || challenge.description;
    challenge.type = type || challenge.type;
    challenge.proofType = proofType || challenge.proofType;
    challenge.points = points || challenge.points;
    if (typeof isActive === 'boolean') challenge.isActive = isActive;

    await challenge.save();
    return res
        .status(200)
        .json(
            new ApiResponse(200, challenge, "Challenge updated successfully")
        )
});

const deleteChallenge = asyncHandler(async (req, res, next) => {
    const challenge = await Challenge.findById(req.params.id);

    if(!challenge) throw new ApiError(404, "Challenge not found");

    await challenge.deleteOne();
    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Challenge deleted successfully")
        );
});

export {
    createChallenge,
    getChallengesById,
    getChallenges,
    updateChallenge,
    deleteChallenge
}
