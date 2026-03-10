const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const Lead = require('../models/Lead');

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Stats retrieved successfully
 */
router.get('/stats', async (req, res) => {
    try {
        const activeVehicles = await Vehicle.countDocuments({ 'publishingControls.status': 'Published' });
        const newLeads = await Lead.countDocuments({ status: 'New' });
        const websiteOnly = await Vehicle.countDocuments({
            'publishingControls.publishOnWebsite': true,
            'publishingControls.publishToAutoTrader': false
        });
        const autoTraderPublished = await Vehicle.countDocuments({ 'publishingControls.publishToAutoTrader': true });
        const financeEnabled = await Vehicle.countDocuments({ 'publishingControls.enableFinance': true });
        const vehicleInquiries = await Lead.countDocuments({ type: 'inquiry' });

        res.json({
            activeVehicles,
            newLeads,
            websiteOnly,
            autoTraderPublished,
            financeEnabled,
            vehicleInquiries
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/dashboard/recent-activity:
 *   get:
 *     summary: Get recent activity
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Recent activity retrieved successfully
 */
router.get('/recent-activity', async (req, res) => {
    // Mock recent activity for now as it's often a separate log table or aggregate
    // In a real app, this could be a 'ActivityLog' model
    const recentActivity = [
        { id: 1, title: '2023 BMW M4 Competition', description: 'Vehicle added', time: '2 hours ago', type: 'added' },
        { id: 2, title: '2021 Porsche 911 GT3', description: 'Vehicle updated', time: '4 hours ago', type: 'updated' }
    ];
    res.json(recentActivity);
});

module.exports = router;
