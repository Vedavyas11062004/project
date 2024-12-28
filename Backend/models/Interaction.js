const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Call', 'Order', 'Email', 'Meeting'], required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    orderAmount: { type: Number },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interaction', interactionSchema);
