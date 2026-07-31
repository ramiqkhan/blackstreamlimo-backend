import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import "./config/cloudinary.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import bookingRoutes from './routes/bookingRoutes.js';
import testimonialRoutes from './routes/testimonial.routes.js'; // Fixed to ES import with .js extension
import dns from "node:dns/promises";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/testimonials", testimonialRoutes); // Registered testimonial route

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// START THE SERVER FOR LOCAL DEV
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Export for Vercel serverless functions
export default app;