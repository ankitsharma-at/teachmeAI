import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdownText: string; // Define the type for the markdown text
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownText }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown remarkPlugins={[[remarkGfm, {forceBlock:true}]]} 
      
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
