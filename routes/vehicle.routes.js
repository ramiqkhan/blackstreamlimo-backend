import express from "express";
import upload from "../middleware/upload.js"; // adjust path if your upload middleware is named differently
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

// GET /api/vehicles - List all vehicles
router.get("/", getVehicles);

// POST /api/vehicles - Create a vehicle
router.post("/", upload.single("image"), createVehicle);

// GET /api/vehicles/:id - Get a single vehicle details
router.get("/:id", getVehicleById);

// PUT /api/vehicles/:id - Update a vehicle
router.put("/:id", upload.single("image"), updateVehicle);

// DELETE /api/vehicles/:id - Delete a vehicle
router.delete("/:id", deleteVehicle);

export default router;