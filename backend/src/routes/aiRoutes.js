const express = require('express');
const router = express.Router();
const { AppError } = require('../utils/errorHandler');
const { generateSummary } = require('../services/summaryService');
const { generateChatResponse } = require('../services/chatService');
const { generateQuiz, submitQuiz } = require('../services/quizService');


router.post('/summary', async (req, res, next) => {
  try {
    const content = req.body.text;
    
    if (!content) {
      throw new AppError('PDF content is required', 400);
    }

    const summary = await generateSummary(content);
    // const summary = splitSummaryString(response)
    // console.log(summary)
    res.json({
      status: 'success',
      data: {content, summary }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/chat', async (req, res, next) => {
  try {
    const { question,pdfText, context } = req.body;
    
    if (!question || !context) {
      throw new AppError('Question and context are required', 400);
    }

    const response = await generateChatResponse(question,pdfText, context);
    
    res.json({
      status: 'success',
      data: { response }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/quiz', async (req, res, next) => {
  try {
    const { content, questionCount } = req.body;
    
    if (!content) {
      throw new AppError('PDF content is required', 400);
    }

    let quiz = await generateQuiz(content, questionCount);
    console.log(quiz)
    res.json({
      status: 'success',
      data: { quiz }
    });
  } catch (error) {
    next(error);
  }});

  router.post('/quiz/submit', async (req, res, next) => {
    try {
      const { quiz1 , answer , content} = req.body;
      
      if (!quiz1 && !answer) {
        throw new AppError('quiz', 400);
      }
  
      const response = await submitQuiz(quiz1, answer , content);
      console.log(quiz1, answer)
      res.json({
        status: 'success',
        response 
      });
    } catch (error) {
      next(error);
    }
});

module.exports = router;