import express from "express";
import {
    createChallenge,
    getChallengesById,
    updateChallenge,
    deleteChallenge,
    getChallenges
} from "../controllers/challenge.controller.js";

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/getChallenges", getChallenges)
router.get("/:id", getChallengesById);

//Protected
router.post("/", protect, createChallenge);
router.put("/:id", protect, updateChallenge);
router.delete("/:id", protect, deleteChallenge);

export default router;

