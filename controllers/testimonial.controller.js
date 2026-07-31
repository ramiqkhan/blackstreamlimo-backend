import Testimonial from '../models/testimonial.model.js';

class TestimonialController {
  create = async (req, res) => {
    try {
      const newTestimonial = await Testimonial.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Testimonial created successfully',
        data: newTestimonial,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const testimonials = await Testimonial.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ success: false, message: 'Testimonial not found' });
      }
      return res.status(200).json({ success: true, data: testimonial });
    } catch (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Testimonial not found for update' });
      }
      return res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        data: updated,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  remove = async (req, res) => {
    try {
      const deleted = await Testimonial.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Testimonial not found for deletion' });
      }
      return res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
  };
}

export default new TestimonialController();