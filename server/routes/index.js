import express from 'express';
import teacherRoutes from './teacherRoutes.js';
import studentRoutes from './studentRoutes.js';
import ratingRoutes from './ratingRoutes.js';
import subjectRoutes from './subjectRoutes.js';
import jobPostRoutes from './jobPostRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();
const path = "/api-v1/"; // Set your common path prefix here

// Use your routes with the common path prefix
router.use(`${path}teachers`, teacherRoutes);
router.use(`${path}students`, studentRoutes);
router.use(`${path}ratings`, ratingRoutes);
router.use(`${path}subjects`, subjectRoutes);
router.use(`${path}jobposts`, jobPostRoutes);

// Additional routes
// Example with authRoute
router.use(`${path}auth`, authRoutes);



export default router;
