const express = require('express');
const router = express.Router();
const aiService = require('../services/ai.service');

/**
 * @swagger
 * /api/ai/generate-description:
 *   post:
 *     summary: Generate a vehicle description using Gemini AI
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: string
 *               mileage:
 *                 type: string
 *               condition:
 *                 type: string
 *               specifications:
 *                 type: object
 *               colorAndAppearance:
 *                 type: object
 *     responses:
 *       200:
 *         description: Successfully generated description
 *       500:
 *         description: AI Service Error
 */
router.post('/generate-description', async (req, res) => {
  try {
    const description = await aiService.generateDescription(req.body);
    res.json({ description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
