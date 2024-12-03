import { useState, useCallback } from 'react';
import { usePdf } from '../context/PdfContext';
import { chatService } from '../services/api';
import { Message, ChatState } from '../types';

const initialState: ChatState = {
  messages: [],
  summary: null,
  isLoading: false,
  error: null,
};

export function useChat() {
  const [state, setState] = useState<ChatState>(initialState);
  const { pdfText } = usePdf();

  const sendMessage = useCallback(async (content: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: content,
        isUser: true,
        timestamp: Date.now(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newUserMessage],
      }));

      const response = await chatService.sendMessage(content, pdfText,state.messages);
      console.log(response)
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: Date.now(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newAiMessage],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to send message. Please try again.',
        isLoading:false,
      }));
    }
  }, [state.messages]);

  const generateSummary = useCallback(async () => {
    if (!pdfText) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const summary = await chatService.generateSummary(pdfText);
      setState(prev => ({ ...prev, summary, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to generate summary. Please try again.',
        isLoading: false,
      }));
    }
  }, [pdfText]);

  const clearChat = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    sendMessage,
    generateSummary,
    clearChat,
  };
}