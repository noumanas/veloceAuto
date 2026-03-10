const mongoose = require('mongoose');

// Sub-schemas for better organization
const CoreInformationSchema = new mongoose.Schema({
    stockNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    registration: {
        type: String,
        trim: true,
        uppercase: true,
        sparse: true // Allows null/undefined but indexes unique values
    },
    vinNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    make: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 1
    },
    mileage: {
        type: Number,
        required: true,
        min: 0
    },
    condition: {
        type: String,
        required: true,
        enum: ['New', 'Used', 'Certified Pre-Owned', 'Salvage']
    }
}, { _id: false });

const MediaSchema = new mongoose.Schema({
    images: [{
        type: String, // URLs or file paths
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png|gif|webp)$/i.test(v) || /^blob:/i.test(v) || /^data:/i.test(v);
            },
            message: 'Invalid image format'
        }
    }],
    videoUrl: {
        type: String,
        validate: {
            validator: function (v) {
                if (!v) return true;
                return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/.test(v);
            },
            message: 'Invalid video URL'
        }
    }
}, { _id: false });

const SpecificationsSchema = new mongoose.Schema({
    engineSize: {
        type: String,
        trim: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid', null],
        default: null
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Manual', 'Semi-Automatic', '8-Speed Automatic', '8-Speed PDK', 'CVT', '6-Speed Manual', '9-Speed Automatic', '8-Speed DCT', '8-Speed Dual-Clutch', '7-Speed SSG', '8-Speed Tiptronic', null],
        default: null
    },
    drivetrain: {
        type: String,
        enum: ['FWD', 'RWD', 'AWD', '4WD', 'GR-Four AWD', 'Quattro AWD', null],
        default: null
    },
    bodyType: {
        type: String,
        enum: ['SUV', 'Saloon', 'Coupe', 'Convertible', 'Hatchback', 'Estate', 'Pickup', 'Van', null],
        default: null
    },
    passengers: {
        type: Number,
        min: 1,
        max: 20
    },
    doors: {
        type: Number,
        min: 2,
        max: 6
    },
    power: {
        type: String,
        trim: true
    }
}, { _id: false });

const ColorAndAppearanceSchema = new mongoose.Schema({
    exteriorColor: {
        type: String,
        trim: true
    },
    interiorColor: {
        type: String,
        trim: true
    }
}, { _id: false });

const PricingSchema = new mongoose.Schema({
    salePrice: {
        type: Number,
        required: true,
        min: 0
    },
    monthlyFinance: {
        type: Number,
        min: 0,
        default: null
    },
    internalCost: {
        type: Number,
        min: 0
    },
    hidePriceOnWebsite: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const DescriptionSchema = new mongoose.Schema({
    overview: {
        type: String,
        trim: true
    },
    conditionNotes: {
        type: String,
        trim: true
    }
}, { _id: false });

const PublishingControlsSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Archived', 'Sold'],
        default: 'Draft'
    },
    publishOnWebsite: {
        type: Boolean,
        default: false
    },
    publishToAutoTrader: {
        type: Boolean,
        default: false
    },
    enableFinance: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const InternalSettingsSchema = new mongoose.Schema({
    internalStatus: {
        type: String,
        enum: ['Active', 'Inactive', 'Sold', 'Reserved'],
        default: 'Active'
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    adminNotes: {
        type: String,
        trim: true
    }
}, { _id: false });

// Main Vehicle Schema
const VehicleSchema = new mongoose.Schema({
    // Reference to dealership/user if needed
    dealershipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealership',
        index: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },

    // Main sections
    coreInformation: {
        type: CoreInformationSchema,
        required: true
    },
    media: {
        type: MediaSchema,
        default: () => ({})
    },
    specifications: {
        type: SpecificationsSchema,
        default: () => ({})
    },
    colorAndAppearance: {
        type: ColorAndAppearanceSchema,
        default: () => ({})
    },
    pricing: {
        type: PricingSchema,
        required: true
    },
    description: {
        type: DescriptionSchema,
        default: () => ({})
    },
    vehicleFeatures: [{
        type: String,
        trim: true
    }],
    marketingHighlights: [{
        type: String,
        trim: true
    }],
    publishingControls: {
        type: PublishingControlsSchema,
        default: () => ({})
    },
    internalSettings: {
        type: InternalSettingsSchema,
        default: () => ({})
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: {
        type: Date
    },
    soldAt: {
        type: Date
    }
});

// Indexes for better query performance
VehicleSchema.index({ 'coreInformation.make': 1, 'coreInformation.model': 1 });
VehicleSchema.index({ 'coreInformation.year': -1 });
VehicleSchema.index({ 'coreInformation.mileage': 1 });
VehicleSchema.index({ 'pricing.salePrice': 1 });
VehicleSchema.index({ 'publishingControls.status': 1, 'publishingControls.publishOnWebsite': 1 });
VehicleSchema.index({ 'internalSettings.tags': 1 });
VehicleSchema.index({ createdAt: -1 });

// Compound indexes for common queries
VehicleSchema.index({
    'publishingControls.status': 1,
    'publishingControls.publishOnWebsite': 1,
    'coreInformation.make': 1,
    'coreInformation.model': 1,
    'coreInformation.year': -1
});

// Full-text search index
VehicleSchema.index({
    'coreInformation.make': 'text',
    'coreInformation.model': 'text',
    'coreInformation.registration': 'text',
    'description.overview': 'text',
    'description.conditionNotes': 'text',
    'vehicleFeatures': 'text',
    'marketingHighlights': 'text'
}, {
    weights: {
        'coreInformation.make': 10,
        'coreInformation.model': 8,
        'vehicleFeatures': 5,
        'marketingHighlights': 3,
        'description.overview': 2
    },
    name: 'VehicleSearchIndex'
});

// Middleware to update timestamps
VehicleSchema.pre('save', async function () {
    this.updatedAt = new Date();

    // Set publishedAt when status changes to Published
    if (this.isModified('publishingControls.status') &&
        this.publishingControls.status === 'Published' &&
        !this.publishedAt) {
        this.publishedAt = new Date();
    }

    // Set soldAt when internalStatus changes to Sold
    if (this.isModified('internalSettings.internalStatus') &&
        this.internalSettings.internalStatus === 'Sold' &&
        !this.soldAt) {
        this.soldAt = new Date();
    }
});

// Instance methods
VehicleSchema.methods.publish = function () {
    this.publishingControls.status = 'Published';
    this.publishingControls.publishOnWebsite = true;
    this.publishedAt = new Date();
    return this.save();
};

VehicleSchema.methods.sell = function () {
    this.internalSettings.internalStatus = 'Sold';
    this.publishingControls.status = 'Sold';
    this.soldAt = new Date();
    return this.save();
};

// Static methods
VehicleSchema.statics.findAvailable = function () {
    return this.find({
        'publishingControls.status': 'Published',
        'publishingControls.publishOnWebsite': true,
        'internalSettings.internalStatus': 'Active'
    }).sort({ 'coreInformation.year': -1, createdAt: -1 });
};

VehicleSchema.statics.search = function (query) {
    return this.find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
};

// Create and export the model
const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
