const express = require('express');
const router = express.Router();
const { generateChatResponse } = require('../services/chatService');
const { AppError } = require('../utils/errorHandler');

router.post('/question', async (req, res, next) => {
  try {
    const { question, context } = req.body;
    
    if (!question || !context) {
      throw new AppError('Question and context are required', 400);
    }

    const response = await generateChatResponse(question, context);
    
    res.json({
      status: 'success',
      data: { response }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;