const { model } = require('../config/gemini');
const { SYSTEM_PROMPTS } = require('../utils/promptTemplates');
const { AppError } = require('../utils/errorHandler');

async function generateQuiz(content, questionCount) {
  try {
    // console.log("Content:", content);

    // Create the prompt
    const prompt = `${SYSTEM_PROMPTS.QUIZ}\n\nCreate ${questionCount} questions based on this content:\n${content}`;
    // console.log("Prompt:", prompt);

    // Generate content from the model
    const result = await model.generateContent(prompt);
    // console.log("Model Result:", result);

    // Await the response text
    let responseText = await result.response.text();
    // console.log("Response Text:", responseText);

    // Sanitize response to remove formatting characters (backticks)
    responseText = responseText.replace(/```json|```/g, '');
    // console.log("Sanitized Response Text:", responseText);

    // Parse the sanitized JSON
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error occurred in generateQuiz:", error);
    throw new AppError("Failed to generate quiz", error, 500);
  }
}
async function submitQuiz(quiz , answers , content ,score){
  try {
    // console.log("Content:", quiz);

    // Create the prompt
    const prompt = `${SYSTEM_PROMPTS.QUIZ_SUBMIT}\n\n from the content: ${content} the  ${quiz} was taken.here are answers given by users :\n${answers} and their score was${score} `;
    // console.log("Prompt:", prompt);

    // Generate content from the model
    const result = await model.generateContent(prompt);
    // console.log("Model Result:", result);

    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error occurred in submitQuiz:", error);
    throw new AppError("Failed to submit quiz", error, 500);
  }
}


module.exports = {
  generateQuiz,
  submitQuiz
};

