import React, { useState, useEffect, memo, useCallback } from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '../hooks/useChat';
import { ChatSummary } from '../components/ChatSummary';
import { Summary } from '../types';

function Chat() {
  const { messages, summary, isLoading, error, sendMessage, generateSummary } = useChat();
  const [input, setInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'summary'>('summary');

  useEffect(() => {
    if (!summary && !isLoading) {
      alert(something went wrong'')
    }
  }, [summary, isLoading, generateSummary]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput('');
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveTab('chat');

    // Implement search handling logic and send result back to the chat
    await sendMessage(` ${searchInput}`);
    setSearchInput('');
     // Switch back to Chat tab
  };
  const Summary = useCallback(():any=>{
    return (   <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 h-auto mb-12"
          >
            <ChatSummary
              summary={summary}
              isLoading={isLoading}
              onGenerate={generateSummary}
            />
          </motion.div>)
  },[summary])
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-4"> 
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'summary' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'
          }`}
        >
          Chat
        </button>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tab Content */}
        {activeTab === 'summary' ? (
       <Summary/>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 bg-white rounded-2xl shadow-xl h-[calc(100vh-10rem)]"
          >
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Chat with AI about your PDF</h1>
                <p className="text-sm text-gray-600">Ask questions about the content of your document</p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isUser
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {!message.isUser && (
                        <Bot className="h-5 w-5 mb-2 text-indigo-600" />
                      )}
                      <p className="text-sm">
                        <MarkdownRenderer markdownText={message.text} />
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-indigo-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="px-4 py-2 bg-red-50 border-t border-red-100">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="p-4 z-0 border-t md:relative fixed bottom-0 w-full bg-white">
                <div className="flex space-x-4">
                  <input
                    type="text"

                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about your PDF..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed Search Bar */}
      {activeTab=='summary' && <div className="fixed bottom-0 md:left-28 ml-1 md:right-28 left-0 right-0 z-50 bg-white p-4 border-b shadow-md">
        <form onSubmit={handleSearchSubmit} className="flex space-x-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search your PDF..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
}
    </div>
  );
}

export default Chat;
