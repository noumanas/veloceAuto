const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String },
    state: { type: String },
    zipCode: { type: String },
    message: { type: String, required: true },
    testDriveDate: { type: String },
    testDriveTime: { type: String },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
