import { NextResponse } from 'next/server';
import getConfig from 'next/config';
import { refinePrompt } from '@/lib/openai';
import { generateMusic } from '@/lib/replicate';
import { buildBasePrompt, buildReplicatePrompt } from '@/utils/promptBuilder';
import { MusicPreferences } from '@/types';

export async function POST(request: Request) {
  try {
    const { serverRuntimeConfig } = getConfig();
    
    if (!serverRuntimeConfig.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Replicate API token not configured' },
        { status: 500 }
      );
    }

    if (!serverRuntimeConfig.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Validate request body
    let preferences: MusicPreferences;
    try {
      preferences = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    if (!preferences.activity) {
      return NextResponse.json(
        { success: false, error: 'Activity is required' },
        { status: 400 }
      );
    }

    // Build and refine the prompt
    const basePrompt = buildBasePrompt(preferences);
    const refinedPrompt = await refinePrompt(basePrompt);
    
    // Generate music using Replicate
    const replicateInput = buildReplicatePrompt(refinedPrompt);
    const audioUrl = await generateMusic(replicateInput);
    
    if (!audioUrl) {
      throw new Error('No audio URL returned from Replicate');
    }
    
    return NextResponse.json({ success: true, audioUrl });
  } catch (error) {
    console.error('API Error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate music'
      },
      { status: 500 }
    );
  }
}
