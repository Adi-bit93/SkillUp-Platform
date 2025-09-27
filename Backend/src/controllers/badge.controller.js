import Badge from "../models/Badge.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createBadge = asyncHandler(async (req, res, next) => {
    const { name, description, criteria, icon } = req.body;

    const existingBadge = await Badge.findOne({ name });

    if (existingBadge) {
        throw new ApiError(404, "Badge already exists");
    }

    const badge = await Badge.create({
        name,
        description,
        criteria,
        icon
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, badge, "Badge created successfully")
        );
})

const getBadges = asyncHandler(async (req, res) => {
    const badges = await Badge.find({});
    return res
        .status(200)
        .json(new ApiResponse(200, badges, "Badges fetched successfully"));
});

const getBadgeById = asyncHandler(async (req, res) => {
    const badge = await Badge.findById(req.params.id);
    if (!badge) throw new ApiError(404, "Badge not found");

    return res
        .status(200)
        .json(new ApiResponse(200, badge, "Badge fetched successfully"));
});

const updateBadge = asyncHandler(async (req, res) => {
    const { name, description, criteria, icon } = req.body;

    const badge = await Badge.findById(req.params.id);
    if (!badge) throw new ApiError(404, "Badge not found");

    badge.name = name || badge.name;
    badge.description = description || badge.description;
    badge.criteria = criteria || badge.criteria;
    badge.icon = icon || badge.icon;

    await badge.save();
    return res
        .status(200)
        .json(
            new ApiResponse(200, badge, "Badge updated successfully")
        )
})

const deleteBadge = asyncHandler(async (req, res) => {
    const badge = await Badge.findById(req.params.id);
    if (!badge) throw new ApiError(404, "Badge not found");

    await badge.deleteOne();
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Badge deleted successfully"));
});

export {
    createBadge,
    getBadges,
    getBadgeById,
    updateBadge,
    deleteBadge
}