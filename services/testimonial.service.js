const Testimonial = require('../models/testimonial.model');

class TestimonialService {
  async createTestimonial(data) {
    const testimonial = await Testimonial.create(data);
    return testimonial;
  }

  async getAllTestimonials() {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return testimonials;
  }

  async getTestimonialById(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) throw new Error('Testimonial not found');
    return testimonial;
  }

  async updateTestimonial(id, updateData) {
    const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) throw new Error('Testimonial not found for update');
    return testimonial;
  }

  async deleteTestimonial(id) {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) throw new Error('Testimonial not found for deletion');
    return testimonial;
  }
}

module.exports = new TestimonialService();