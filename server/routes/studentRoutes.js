import express from 'express';
import * as studentController from '../controllers/studentController.js';

const router = express.Router();

router.post('/students', studentController.createStudent);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Add other student-related routes as needed

export default router;
