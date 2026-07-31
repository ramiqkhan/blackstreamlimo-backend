import bookingService from '../services/bookingService.js';

export const createBooking = async (req, res) => {
  try {
    const { 
      tripType, 
      duration, 
      orderType, 
      pickupDateTime, 
      pickupType, 
      pickupAddress, 
      airline, 
      flightNumber, 
      dropoffType, 
      dropoffAddress, 
      stops, 
      passengerCount, 
      selectedVehicle, 
      firstName, 
      lastName, 
      email, 
      optionalEmail, 
      phone, 
      specialInstructions 
    } = req.body;

    // Validate essential vehicle selection
    if (!selectedVehicle) {
      return res.status(400).json({ success: false, message: 'Vehicle selection is required.' });
    }

    const payload = {
      tripType,
      duration,
      orderType,
      pickupDateTime,
      pickupType,
      pickupAddress,
      airline,
      flightNumber,
      dropoffType,
      dropoffAddress,
      stops,
      passengerCount,
      selectedVehicle,
      firstName,
      lastName,
      email,
      optionalEmail,
      phone,
      specialInstructions
    };

    const newBooking = await bookingService.createBooking(payload);

    return res.status(201).json({
      success: true,
      message: 'Reservation request successfully received.',
      data: newBooking
    });
  } catch (error) {
    console.error('Create Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process reservation.',
      error: error.message
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const status = req.query.status;

    const filter = status ? { status } : {};
    const result = await bookingService.getAllBookings(filter, page, limit);

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await bookingService.updateBookingStatus(req.params.id, status);
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};