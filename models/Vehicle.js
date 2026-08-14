import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
enum: [
        "Luxury SUV – Escalade",
        "Stretch Limousine",
        "Limo Sprinter",
        "Executive Sprinter",
        "Shuttle Sprinter",
        "Party Bus"
      ],
            trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    specs: {
      passengers: { type: String, required: true },
      luggage: { type: String, required: true },
      safety: { type: String, required: true },
      comfort: { type: String, required: true },
    },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);