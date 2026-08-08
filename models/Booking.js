import mongoose from 'mongoose';

const StopSchema = new mongoose.Schema({
  address: { type: String, required: true }
});

const VehicleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  capacity: { type: String, required: true },
  luggage: { type: String, required: true },
  image: { type: String }
  // price and total removed completely
});
const BookingSchema = new mongoose.Schema(
  {
    bookingId: { 
      type: String, 
      unique: true 
    },
    tripType: { 
      type: String, 
      enum: ['hourly', 'oneway', 'roundtrip'], 
      required: true 
    },
    duration: { type: String, default: '3 Hours' },
    orderType: { type: String, required: true },
    pickupDateTime: { type: Date, required: true },
    
    pickupType: { type: String, enum: ['address', 'airport'], default: 'address' },
    pickupAddress: { type: String, required: true },
    airline: { type: String },
    flightNumber: { type: String },

    dropoffType: { type: String, enum: ['address', 'airport'], default: 'address' },
    dropoffAddress: { type: String },

    stops: [StopSchema],
    passengerCount: { type: Number, required: true, min: 1 },

    selectedVehicle: { type: VehicleSchema, required: true },

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    optionalEmail: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    specialInstructions: { type: String },

    status: { 
      type: String, 
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], 
      default: 'Pending' 
    }
  },
  { timestamps: true }
);

// Automatically generate a 6-digit booking ID before saving
// Automatically generate a 6-digit booking ID before saving
BookingSchema.pre('save', function () {
  if (!this.bookingId) {
    this.bookingId = Math.floor(100000 + Math.random() * 900000).toString();
  }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;