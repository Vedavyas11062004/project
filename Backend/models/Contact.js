const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
