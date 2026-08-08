import bookingService from '../services/bookingService.js';
import sendEmail from '../utils/sendEmail.js';

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

    const payload = req.body;
    const newBooking = await bookingService.createBooking(payload);

    // Send the confirmation email with all details and the requested note
    try {
      await sendEmail(
        email, 
        'Booking Confirmation - BlackStream Limo', 
        `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Thank you for your booking, ${firstName} ${lastName}!</h2>
          <p>We have successfully received your reservation request. <strong>We will contact you as soon as possible.</strong></p>
          
          <hr style="border: 0; border-top: 1px solid #eee;" />
          
          <h3>Booking Summary:</h3>
          <ul>
            <li><strong>Trip Type:</strong> ${tripType}</li>
            <li><strong>Pickup Date & Time:</strong> ${new Date(pickupDateTime).toLocaleString()}</li>
            <li><strong>Pickup Address:</strong> ${pickupAddress}</li>
            <li><strong>Dropoff Address:</strong> ${dropoffAddress || 'N/A'}</li>
            <li><strong>Vehicle:</strong> ${selectedVehicle.name} (${selectedVehicle.class})</li>
            <li><strong>Passengers:</strong> ${passengerCount}</li>
            <li><strong>Total Price:</strong> $${selectedVehicle.total || selectedVehicle.price}</li>
          </ul>

          ${specialInstructions ? `<p><strong>Special Instructions:</strong> ${specialInstructions}</p>` : ''}
          
          <p style="margin-top: 20px;">Best regards,<br/><strong>BlackStream Limo Team</strong></p>
        </div>
        `
      );
    } catch (emailError) {
      console.error("Email failed to send, but booking was saved:", emailError);
    }

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

export const deleteBooking = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.id);
    return res.status(200).json({ success: true, message: 'Booking successfully deleted.' });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};