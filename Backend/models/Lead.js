const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  notes: { type: String },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Missed'], default: 'Scheduled' },
});

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ['New', 'Contacted', 'Interested', 'Closed'], default: 'New' },
    callFrequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], default: 'Weekly' },
    lastCallDate: { type: Date },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
    interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interaction' }],
    callSchedule: [callSchema], // Call schedule schema
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
