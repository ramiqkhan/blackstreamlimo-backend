import express from 'express';
// Change this line:
import {
  createBooking,
  getBookings,
  getBookingById,
  updateStatus,
  deleteBooking, // <--- 1. Import delete controller
} from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/bookings - Submit reservation
router.post('/', createBooking);

// GET /api/bookings - List reservations (Admin)
router.get('/', getBookings);

// GET /api/bookings/:id - Single reservation details
router.get('/:id', getBookingById);

// PATCH /api/bookings/:id/status - Update reservation status
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteBooking);
export default router;