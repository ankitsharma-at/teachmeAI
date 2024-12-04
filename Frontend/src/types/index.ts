export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface Summary {
  summary:any;

}

export interface ChatState {
  messages: Message[];
  summary: Summary | null;
  isLoading: boolean;
  error: string | null;
}