import axios from 'axios';
import { Message } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  async sendMessage(content: string,pdfText: string, context: Message[], ) {
    // console.log(context)
    // console.log(content)
    const response = await api.post('/chat', { question:content, context,pdfText });
    console.log(response)
    return response.data.data.response;
  },

  async generateSummary(content: string) {
    console.log(content)
    const response = await api.post('/summary', { text:content });
    console.log(response.data.data.summary)
    return response.data.data.summary;
  },
};

export const quizService = {
  async generateQuiz(content: string) {
    const {data} = await api.post('/quiz', { content ,questionCount:4 });
    console.log(data)
    return data.data.quiz;
  },

  async submitQuiz(quiz1:any ,answer: Record<string, number>,content:string,score:number) {
    const response = await api.post('/quiz/submit', { quiz1 ,answer ,content ,score });
    return response.data.response;
  },
};

export const pdfService = {
  async analyzeContent(content: string) {
    const response = await api.post('/pdf/analyze', { content });
    return response.data.response;
  },
};