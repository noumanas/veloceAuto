const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles with pagination, search, and filtering
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [Draft, Published, Archived, Sold] }
 *     responses:
 *       200:
 *         description: Paginated list of vehicles
 */
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { search, status } = req.query;

        const query = {};
        if (status && status !== 'All Statuses') {
            query['publishingControls.status'] = status;
        }

        if (search) {
            query.$or = [
                { 'coreInformation.make': { $regex: search, $options: 'i' } },
                { 'coreInformation.model': { $regex: search, $options: 'i' } },
                { 'coreInformation.registration': { $regex: search, $options: 'i' } },
                { 'coreInformation.stockNumber': { $regex: search, $options: 'i' } }
            ];
        }

        const vehicles = await Vehicle.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Vehicle.countDocuments(query);

        res.json({
            vehicles,
            total,
            page,
            pages: Math.ceil(total / limit),
            limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [coreInformation, pricing]
 *             properties:
 *               coreInformation:
 *                 type: object
 *                 required: [stockNumber, vinNumber, make, model, year, mileage, condition]
 *                 properties:
 *                   stockNumber: { type: string }
 *                   registration: { type: string }
 *                   vinNumber: { type: string }
 *                   make: { type: string }
 *                   model: { type: string }
 *                   year: { type: number }
 *                   mileage: { type: number }
 *                   condition: { type: string, enum: [New, Used, Certified Pre-Owned, Salvage] }
 *               media:
 *                 type: object
 *                 properties:
 *                   images: { type: array, items: { type: string } }
 *                   videoUrl: { type: string }
 *               specifications:
 *                 type: object
 *                 properties:
 *                   engineSize: { type: string }
 *                   fuelType: { type: string }
 *                   transmission: { type: string }
 *                   drivetrain: { type: string }
 *                   bodyType: { type: string }
 *               pricing:
 *                 type: object
 *                 required: [salePrice]
 *                 properties:
 *                   salePrice: { type: number }
 *                   monthlyFinance: { type: number }
 *                   internalCost: { type: number }
 *               publishingControls:
 *                 type: object
 *                 properties:
 *                   status: { type: string, enum: [Draft, Published, Archived, Sold] }
 *                   publishOnWebsite: { type: boolean }
 *                   publishToAutoTrader: { type: boolean }
 *                   enableFinance: { type: boolean }
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 */
router.post('/', async (req, res) => {
    try {
        const { coreInformation } = req.body;

        // Check for existing registration number if provided
        if (coreInformation && coreInformation.registration) {
            const existingVehicle = await Vehicle.findOne({
                'coreInformation.registration': coreInformation.registration
            });
            if (existingVehicle) {
                return res.status(400).json({ message: 'vehicle is already added system' });
            }
        }

        const vehicle = await Vehicle.create(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get a single vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle details
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       404:
 *         description: Vehicle not found
 */
router.put('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after', runValidators: true }
        );
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
