import React, { createContext, useContext, useState } from 'react';

interface PdfContextType {
  pdfText: string;
  setPdfText: (text: string) => void;
  score: number;
  setScore: (score: number) => void;
  finalScore: number;
  setFinalScore: (score: number) => void;
  quiz: any;
  setQuiz:any;
  ansArr :any;
  setAnsArr:any
}

const PdfContext = createContext<PdfContextType | undefined>(undefined);

export function PdfProvider({ children }: { children: React.ReactNode }) {
  const [pdfText, setPdfText] = useState('');
  const [score, setScore] = useState(0);
  const [ finalScore , setFinalScore] = useState(0)
  const [quiz,setQuiz] = useState();
  const [ansArr , setAnsArr] = useState();

  return (
    <PdfContext.Provider value={{ pdfText, setPdfText, score, setScore ,finalScore, setFinalScore ,quiz,setQuiz,ansArr , setAnsArr}}>
      {children}
    </PdfContext.Provider>
  );
}

export function usePdf() {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error('usePdf must be used within a PdfProvider');
  }
  return context;
}