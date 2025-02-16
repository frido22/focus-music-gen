import OpenAI from 'openai';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const openai = new OpenAI({
  apiKey: serverRuntimeConfig.OPENAI_API_KEY,
});

export async function refinePrompt(basePrompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert music producer. Convert the given description into a detailed prompt for AI music generation."
        },
        {
          role: "user",
          content: basePrompt
        }
      ],
    });

    return completion.choices[0].message.content || basePrompt;
  } catch (error) {
    console.error('Error refining prompt:', error);
    return basePrompt;
  }
};
