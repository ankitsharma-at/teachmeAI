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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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