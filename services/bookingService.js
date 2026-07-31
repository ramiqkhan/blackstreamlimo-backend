import Booking from '../models/Booking.js';

class BookingService {
  /**
   * Create and persist a new reservation request
   */
  async createBooking(bookingData) {
    const booking = new Booking(bookingData);
    return await booking.save();
  }

  /**
   * Fetch all bookings with simple pagination or filtering
   */
  async getAllBookings(filter = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    return { bookings, total, page, totalPages: Math.ceil(total / limit) };
  }

  /**
   * Retrieve single booking by ID
   */
  async getBookingById(id) {
    const booking = await Booking.findById(id);
    if (!booking) throw new Error('Booking not found');
    return booking;
  }

  /**
   * Update reservation status (e.g. Confirm / Cancel)
   */
  async updateBookingStatus(id, status) {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) throw new Error('Booking not found');
    return booking;
  }
}

export default new BookingService();