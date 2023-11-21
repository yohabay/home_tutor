import express from 'express';
import * as ratingController from '../controllers/ratingController.js';

const router = express.Router();

router.post('/ratings', ratingController.createRating);
router.get('/ratings/:id', ratingController.getRatingById);
router.put('/ratings/:id', ratingController.updateRating);
router.delete('/ratings/:id', ratingController.deleteRating);

// Add other rating-related routes as needed

export default router;
