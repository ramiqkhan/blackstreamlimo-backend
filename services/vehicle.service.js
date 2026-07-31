import Vehicle from "../models/Vehicle.js";

class VehicleService {
  async createVehicle(data, file) {
    if (!file) {
      throw new Error("Vehicle image is required");
    }

    const specs = typeof data.specs === "string" ? JSON.parse(data.specs) : data.specs;

    const vehicleData = {
      ...data,
      specs,
      image: {
        url: file.path,
        public_id: file.filename,
      },
    };

    return await Vehicle.create(vehicleData);
  }

  async getAllVehicles(category) {
    const filter = category ? { category } : {};
    return await Vehicle.find(filter).sort({ createdAt: -1 });
  }

  async getVehicleById(id) {
    return await Vehicle.findOne({ customId: id });
  }

  async updateVehicle(id, updateData, file) {
    let payload = { ...updateData };

    if (payload.specs && typeof payload.specs === "string") {
      payload.specs = JSON.parse(payload.specs);
    }

    if (file) {
      payload.image = {
        url: file.path,
        public_id: file.filename,
      };
    }

    return await Vehicle.findOneAndUpdate({ customId: id }, payload, {
      new: true,
      runValidators: true,
    });
  }

  async deleteVehicle(id) {
    return await Vehicle.findOneAndDelete({ customId: id });
  }
}

export default new VehicleService();