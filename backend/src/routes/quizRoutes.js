const express = require('express');
const router = express.Router();
const { generateQuiz } = require('../services/quizService');
const { AppError } = require('../utils/errorHandler');

router.post('/generate', async (req, res, next) => {
  try {
    const { content, questionCount } = req.body;
    
    if (!content) {
      throw new AppError('PDF content is required', 400);
    }

    const quiz = await generateQuiz(content, questionCount);
    
    res.json({
      status: 'success',
      data: { quiz }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;