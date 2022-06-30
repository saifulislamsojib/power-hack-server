import express from 'express';
import {
    addStudent,
    deleteStudent,
    getStudentByRoll,
    getStudents,
    updateStatus,
    updateStudent,
} from '../controllers/student.controller';

const router = express.Router();

router.get('/', getStudents);

router.get('/:roll', getStudentByRoll);

router.post('/', addStudent);

router.patch('/updateStatus', updateStatus);

router.patch('/:id', updateStudent);

router.delete('/:id', deleteStudent);

export default router;
