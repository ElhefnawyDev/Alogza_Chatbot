// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  // Existing OpenAI models
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  },
  // New Gemini model
  {
    id: 'gemini-pro',
    label: 'Google Gemini',
    apiIdentifier: 'gemini-1.5-pro', // Matches Google's model name
    description: 'Google\'s advanced multimodal model with strong reasoning skills',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
