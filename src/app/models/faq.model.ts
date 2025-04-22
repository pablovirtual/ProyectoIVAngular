export interface Faq {
  id: number;
  question: string;
  answer: string;
  order?: number;
  collapsed?: boolean; // Used for UI state
  created_at?: string;
  updated_at?: string;
}
