const express = require('express');
const router = express.Router();
const multer = require('multer');
const { processPdf, getPdfSummary } = require('../services/pdfService');

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.post('/upload', async (req, res, next) => {
  try {
    

    const pdfContent = await req.body.text;
    console.log(pdfContent)
    const summary = await getPdfSummary(pdfContent);
    console.log(summary)
    res.json({
      status: 'success',
      data: { summary, content: pdfContent }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;