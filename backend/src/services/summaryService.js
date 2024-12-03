const { model } = require('../config/gemini');
const { SYSTEM_PROMPTS } = require('../utils/promptTemplates');
const { AppError } = require('../utils/errorHandler');

async function generateSummary(content) {
  try {
    const prompt = `${SYSTEM_PROMPTS.SUMMARY}\n\n${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new AppError('Failed to generate summary', 500);
  }
}

module.exports = {
  generateSummary
};