import express from 'express';
import { 
    getGlobalLeaderboard,
    getSchoolLeaderboard,
    getMyRank
} from "../controllers/leaderboard.controller.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//public routes
router.get("/global", getGlobalLeaderboard);
router.get("/school/:schoolId", getSchoolLeaderboard);

//private route (student rank)

router.get("/rank/me", protect, getMyRank)

export default router;
