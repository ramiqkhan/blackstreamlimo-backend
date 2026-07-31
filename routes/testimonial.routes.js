import express from 'express';
import testimonialController from '../controllers/testimonial.controller.js';

const router = express.Router();

// Public routes
router.get('/', testimonialController.getAll);
router.get('/:id', testimonialController.getById);

// Dashboard / Admin protected routes (Create, Update, Delete)
router.post('/', testimonialController.create);
router.put('/:id', testimonialController.update);
router.delete('/:id', testimonialController.remove);

export default router; // <-- Crucial: ES Module default export