import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Share2 } from 'lucide-react';
import { usePdf } from '../context/PdfContext';
import { motion } from 'framer-motion';
import { quizService } from '../services/api';
import MarkdownRenderer from '../components/MarkdownRenderer';

function Scorecard() {
  const navigate = useNavigate();
  const [response , setResponse] = useState("")
  const { finalScore,quiz , ansArr,pdfText } = usePdf();
  let result:any;
 
  
  useEffect(()=>{
     async function resultQuiz(){
    result =await quizService.submitQuiz(quiz , ansArr ,pdfText , finalScore)
    // console.log(result)
    setResponse(result)
    
  }
    resultQuiz()
  },[result])
  const getGrade = (finalScore: number) => {
    if (finalScore >= 90) return { letter: 'A', color: 'text-green-600' };
    if (finalScore >= 80) return { letter: 'B', color: 'text-blue-600' };
    if (finalScore >= 60) return { letter: 'C', color: 'text-yellow-600' };
    if (finalScore >= 40) return { letter: 'D', color: 'text-orange-600' };
    return { letter: 'F', color: 'text-red-600' };
  };

  const { letter, color } = getGrade(finalScore);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-indigo-50 rounded-full mb-4">
            <Trophy className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Results</h1>
          <p className="text-lg text-gray-600">Here's how you performed on the quiz</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className={`text-8xl font-bold ${color}`}>
              {letter}
            </div>
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-sm px-2 py-1 rounded-full">
              {finalScore}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Evaluation</h3>
            <ul className="space-y-2 text-gray-600">
              <MarkdownRenderer markdownText={response}/>
            </ul>
          </div>
          {/* <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Areas to Improve</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Review specific topics</li>
              <li>• Practice more complex questions</li>
              <li>• Take more practice quizzes</li>
            </ul>
          </div> */}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/quiz')}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Try Again
          </button>
          <button
            onClick={() => {/* Implement share functionality */}}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Results
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Scorecard;