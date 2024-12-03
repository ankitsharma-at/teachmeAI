import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { PdfUploader } from '../components/PdfUploader';

function Upload() {
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    navigate('/chat');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your PDF Document
          </h1>
          <p className="text-lg text-gray-600">
            Learn smarter with AI-powered insights and personalized quizzes
          </p>
        </div>

        <PdfUploader onUploadSuccess={handleUploadSuccess} />

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            What you'll get:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              icon={<FileText className="h-6 w-6 text-indigo-600" />}
              title="Text Extraction"
              description="Automatic extraction of text content from your PDF"
            />
            <Feature
              icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
              title="AI Chat"
              description="Ask questions and get instant answers about your document"
            />
            <Feature
              icon={<Brain className="h-6 w-6 text-indigo-600" />}
              title="Smart Quizzes"
              description="Generate personalized quizzes to test your knowledge"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default Upload;