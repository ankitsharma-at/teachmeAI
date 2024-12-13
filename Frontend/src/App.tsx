import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Upload from './pages/Upload';
import Chat from './pages/Chat';
import Quiz from './pages/Quiz';
import Scorecard from './pages/Scorecard';
import { PdfProvider } from './context/PdfContext';

function App() {
  return (
    <PdfProvider>
      <BrowserRouter>
      
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/scorecard" element={<Scorecard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PdfProvider>
  );
}

export default App;