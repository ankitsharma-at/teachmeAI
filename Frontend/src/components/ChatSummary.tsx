import { FileText, LucideLightbulb } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatSummaryProps {
  summary: string | null;
  isLoading: boolean;
  onGenerate: () => void;
}

export function ChatSummary({ summary, isLoading, onGenerate }: ChatSummaryProps) {
  console.log(summary);
  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <button
        onClick={onGenerate}
        className="w-full bg-indigo-200 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-500 text-indigo-700 dark:text-gray-100 rounded-lg p-4 transition-colors"
      >
        <FileText className="h-5 w-5 mb-2 mx-auto text-indigo-600 dark:text-gray-300" />
        <span className="text-sm font-medium">Generate Summary</span>
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 w-full rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"></h3>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <LucideLightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
          <h4 className="font-medium text-gray-900 dark:text-gray-100">Summary document</h4>
        </div>
        <MarkdownRenderer markdownText={summary} />
      </div>
    </div>
  );
}
