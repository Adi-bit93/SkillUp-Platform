import express from 'express';

import { 
    createSubmission,
    reviewSubmission,
    getAllSubmissions,
    getMySubmissions
} from '../controllers/submission.controller.js';
import { protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/", protect, createSubmission);
router.get("/my", protect , getMySubmissions);

router.get("/", protect , getAllSubmissions);
router.put("/:id/review", protect , reviewSubmission)

export default router;
