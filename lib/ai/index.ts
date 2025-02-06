import { openai } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { experimental_wrapLanguageModel as wrapLanguageModel, LanguageModelV1 } from 'ai';

import { customMiddleware } from './custom-middleware';

// Initialize Google AI with the API key from .env
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY
});

export const customModel = (apiIdentifier: string) => {
  if (apiIdentifier.includes('gemini')) {
    return wrapLanguageModel({
      model: google(apiIdentifier),
      middleware: customMiddleware,
    });
  } else if (apiIdentifier.includes('gpt')) {
    return wrapLanguageModel({
      model: openai(apiIdentifier),
      middleware: customMiddleware,
    });
  }
};

export const imageGenerationModel = openai.image('dall-e-3');
