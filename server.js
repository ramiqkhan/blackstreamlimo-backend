import dotenv from "dotenv";
dotenv.config(); // Must be at the very top!

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import bookingRoutes from './routes/bookingRoutes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import dns from "node:dns/promises";

// Import your transporter from your utility file
// (Make sure the path matches where you saved that transporter file, e.g., './utils/transporter.js')
import transporter from "./config/mailer.js";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

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
app.use("/api/testimonials", testimonialRoutes);

// Test Email Route using the Transporter directly
app.get("/api/test-email", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `"Watch Store" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends an email to yourself
      subject: "Test Email from Watch Store Backend",
      text: "Congratulations! Your transporter setup is working successfully.",
    });

    console.log("✅ Email sent: %s", info.messageId);
    res.status(200).json({ success: true, message: "Test email sent successfully!", messageId: info.messageId });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

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