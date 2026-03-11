const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Service to handle AI-related operations using Google Gemini
 */
class AIService {
  constructor() {
    this.genAI = null;
    this.model = null;
    this.apiKey = process.env.GEMINI_API_KEY;
    
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    }
  }

  /**
   * Generates a professional vehicle description
   * @param {Object} vehicleData - Data containing make, model, year, and specifications
   * @returns {Promise<string>} - The generated description
   */
  async generateDescription(vehicleData) {
    if (!this.apiKey || !this.model) {
      throw new Error("Gemini API Key is not configured. Please add GEMINI_API_KEY to your .env file.");
    }

    const { make, model, year, mileage, condition, specifications, colorAndAppearance } = vehicleData;

    const prompt = `
      Write a professional, engaging, and high-end vehicle description for a luxury car dealership website.
      
      Vehicle Details:
      - Make: ${make}
      - Model: ${model}
      - Year: ${year}
      - Condition: ${condition}
      - Mileage: ${mileage} miles
      - Engine: ${specifications?.engineSize || 'N/A'}
      - Fuel: ${specifications?.fuelType || 'N/A'}
      - Transmission: ${specifications?.transmission || 'N/A'}
      - Color: ${colorAndAppearance?.exteriorColor || 'N/A'} exterior, ${colorAndAppearance?.interiorColor || 'N/A'} interior
      
      Requirements:
      - Tone: Elegant, authoritative, and persuasive.
      - Length: Approximately 3-4 sentences.
      - Focus: Highlight the performance, style, and luxury aspects.
      - Avoid: Generic filler or excessive emojis.
      
      Return ONLY the description text.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error("Gemini API Error details:", error);
      // Return more specific error message if available
      const errorMessage = error.message || "Unknown Gemini API error";
      throw new Error(`Gemini AI Error: ${errorMessage}`);
    }
  }
}

module.exports = new AIService();
