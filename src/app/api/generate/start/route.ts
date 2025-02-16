import { NextResponse } from 'next/server';
import { MusicPreferences } from '@/types';
import { buildBasePrompt, buildReplicatePrompt } from '@/utils/promptBuilder';
import { refinePrompt } from '@/lib/openai';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const apiToken = serverRuntimeConfig.REPLICATE_API_TOKEN;

if (!apiToken) {
  throw new Error('Missing Replicate API token');
}

export async function POST(request: Request) {
  try {
    const preferences: MusicPreferences = await request.json();

    if (!preferences.activity) {
      return NextResponse.json(
        { success: false, error: 'Activity is required' },
        { status: 400 }
      );
    }

    // Build and refine the prompt
    const basePrompt = buildBasePrompt(preferences);
    const refinedPrompt = await refinePrompt(basePrompt);
    const replicateInput = buildReplicatePrompt(refinedPrompt);

    // Start the prediction
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
        input: replicateInput
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Replicate API error: ${error}`);
    }

    const prediction = await response.json();
    return NextResponse.json({ 
      success: true, 
      predictionId: prediction.id 
    });

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to start music generation'
      },
      { status: 500 }
    );
  }
}
