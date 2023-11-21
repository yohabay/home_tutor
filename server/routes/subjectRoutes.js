import express from 'express';
import * as subjectController from '../controllers/subjectController.js';

const router = express.Router();

router.post('/subjects', subjectController.createSubject);
router.get('/subjects/:id', subjectController.getSubjectById);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);

// Add other subject-related routes as needed

export default router;
