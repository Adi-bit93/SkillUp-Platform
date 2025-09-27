import express from 'express';
import {
    createBadge,
    getBadges,
    getBadgeById,
    updateBadge,
    deleteBadge
} from '../controllers/badge.controller.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

//public 
router.get("/", getBadges);
router.get("/:id", getBadgeById);

//protected
router.post("/", protect, createBadge);
router.put("/:id", protect, updateBadge);
router.delete("/:id", protect, deleteBadge);

export default router;
