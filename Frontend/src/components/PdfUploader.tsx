import React, { useCallback, useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import { usePdf } from '../context/PdfContext';
import PDFToText from 'react-pdftotext';

interface PdfUploaderProps {
  onUploadSuccess: () => void;
}

export function PdfUploader({ onUploadSuccess }: PdfUploaderProps) {
  const { setPdfText } = usePdf();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await PDFToText(file);
      setPdfText(text);
      onUploadSuccess();
    } catch (err) {
      setError('Failed to extract text from PDF. Please try again.');
      console.error('Error processing PDF:', err);
    } finally {
      setIsLoading(false);
    }
  }, [setPdfText, onUploadSuccess]);

  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center bg-white dark:bg-gray-800 transition-colors duration-300 ease-in-out">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        id="pdf-upload"
        disabled={isLoading}
      />
      <label
        htmlFor="pdf-upload"
        className={`cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex flex-col items-center">
          <div className="bg-indigo-50 dark:bg-indigo-600 rounded-full p-4 mb-4">
            <UploadIcon className={`h-8 w-8 text-indigo-600 dark:text-indigo-300 ${isLoading ? 'animate-pulse' : ''}`} />
          </div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300 ease-in-out">
            {isLoading ? 'Processing PDF...' : 'Drop your PDF here or click to upload'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Maximum file size: 10MB
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </label>
    </div>
  );
}
