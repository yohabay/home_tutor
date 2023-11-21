import express from 'express';
import * as teacherController from '../controllers/teacherController.js';

const router = express.Router();

router.post('/teachers', teacherController.createTeacher);
router.get('/teachers/:id', teacherController.getTeacherById);
router.put('/teachers/:id', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);

// Add other teacher-related routes as needed

export default router;
