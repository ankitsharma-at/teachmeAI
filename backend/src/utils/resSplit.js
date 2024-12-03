function splitSummaryString(response) {
    
    // function parseSummary(response) {
        // Split the response into sections using '**' as a delimiter
        const sections = response.split("**");
      
        // Initialize result
        let mainpoints = "";
        let keyTakeaways = "";
        let additionalText = "";
      
        // Iterate through sections to find "Main Points", "Key Takeaways", and "Additional Text"
        for (let i = 0; i < sections.length; i++) {
          const sectionTitle = sections[i].trim().toLowerCase();
          const sectionContent = sections[i + 1] ? sections[i + 1].trim() : "";
      
          if (sectionTitle.includes("main points")) {
            mainpoints = sectionContent;
          } else if (sectionTitle.includes("key takeaways")) {
            keyTakeaways = sectionContent;
          } else if (sectionTitle.includes("additional text")) {
            additionalText = sectionContent;
          }
        }
      
        // Return the extracted sections
        return { mainpoints, keyTakeaways, additionalText };
      }
      
      
  
  
  module.exports = splitSummaryString
  // Example usage
  const response = `
  **Main Points**
  
  * **Frontend Completed:** React-based frontend allows PDF upload and text parsing.
  * **Backend and AI Integration:** Backend will process PDF text, summarize content, and generate quizzes using AI.
  * **AI Model:** AI model will identify key concepts and generate questions.
  * **Backend Setup:** Backend setup is underway, and AI model integration is in progress.
  
  **Key Takeaways**
  
  * The team is exploring question-generation model integration approaches.
  * Suggestions are sought for improving PDF text extraction accuracy.
  * Advice is needed on quiz scoring methods, considering accuracy and time-based factors.
  `;
  
  const summary = splitSummaryString(response);
  console.log(summary);
  