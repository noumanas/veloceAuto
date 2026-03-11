const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Create a new inquiry
 *     tags: [Inquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, mobileNumber, message]
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               mobileNumber: { type: string }
 *               address: { type: string }
 *               state: { type: string }
 *               zipCode: { type: string }
 *               message: { type: string }
 *               testDriveDate: { type: string }
 *               testDriveTime: { type: string }
 *     responses:
 *       201:
 *         description: Inquiry created successfully
 */
router.post('/', async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.status(201).json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/inquiries:
 *   get:
 *     summary: Get all inquiries
 *     tags: [Inquiries]
 *     responses:
 *       200:
 *         description: List of inquiries
 */
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/inquiries/{id}:
 *   get:
 *     summary: Get specific inquiry details
 *     tags: [Inquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inquiry details
 *       404:
 *         description: Inquiry not found
 */
router.get('/:id', async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/inquiries/{id}:
 *   put:
 *     summary: Update inquiry status
 *     tags: [Inquiries]
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
 *             properties:
 *               status: { type: string, enum: ['New', 'Contacted', 'Closed'] }
 *     responses:
 *       200:
 *         description: Inquiry updated successfully
 */
router.put('/:id', async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after', runValidators: true }
        );
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
