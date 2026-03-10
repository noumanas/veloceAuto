const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    registration: { type: String, required: true },
    mileage: { type: String },
    valuation: { type: String },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
    type: { type: String, enum: ['sell', 'inquiry'], default: 'sell' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
