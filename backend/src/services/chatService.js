const { model } = require('../config/gemini');
const { SYSTEM_PROMPTS } = require('../utils/promptTemplates');
const { AppError } = require('../utils/errorHandler');

async function generateChatResponse(question,pdfText, context) {
  try {
    // console.log(question,pdfText,context)
    const prompt = `${SYSTEM_PROMPTS.CHAT}\n\ncontent:${pdfText} /n/nContext: ${context}\n\nQuestion: ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new AppError('Failed to generate chat response', 500);
  }
}

module.exports = {
  generateChatResponse
};