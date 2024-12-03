export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface Summary {
  summary:string;
  data :string;
  mainpoints :string;
  keyTakeaways :string;
  additionalText: string;
}

export interface ChatState {
  messages: Message[];
  summary: Summary | null;
  isLoading: boolean;
  error: string | null;
}