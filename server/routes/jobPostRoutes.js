import express from 'express';
import * as jobPostController from '../controllers/jobPostController.js';

const router = express.Router();

router.post('/jobposts', jobPostController.createJobPost);
router.get('/jobposts/:id', jobPostController.getJobPostById);
router.put('/jobposts/:id', jobPostController.updateJobPost);
router.delete('/jobposts/:id', jobPostController.deleteJobPost);

// Add other job post-related routes as needed

export default router;
