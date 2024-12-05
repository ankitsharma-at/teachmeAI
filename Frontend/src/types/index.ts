export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface Summary {
  summary:string;

}

export interface ChatState {
  messages: Message[];
  summary: string | null;
  isLoading: boolean;
  error: string | null;
}