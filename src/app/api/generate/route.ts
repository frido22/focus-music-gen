import { NextResponse } from 'next/server';
import { refinePrompt } from '@/lib/openai';
import { generateMusic } from '@/lib/replicate';
import { buildBasePrompt, buildReplicatePrompt } from '@/utils/promptBuilder';
import { MusicPreferences } from '@/types';

export async function POST(request: Request) {
  console.log('API Token:', process.env.REPLICATE_API_TOKEN ? 'Present' : 'Missing');
  
  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { success: false, error: 'Replicate API token not configured' },
      { status: 500 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const preferences: MusicPreferences = await request.json();
    console.log('Received preferences:', preferences);
    
    // Build and refine the prompt
    const basePrompt = buildBasePrompt(preferences);
    console.log('Base prompt:', basePrompt);
    
    const refinedPrompt = await refinePrompt(basePrompt);
    console.log('Refined prompt:', refinedPrompt);
    
    // Generate music using Replicate
    const replicateInput = buildReplicatePrompt(refinedPrompt);
    console.log('Replicate input:', replicateInput);
    
    const audioUrl = await generateMusic(replicateInput);
    console.log('Audio URL:', audioUrl);
    
    if (!audioUrl) {
      throw new Error('No audio URL returned from Replicate');
    }
    
    return NextResponse.json({ success: true, audioUrl });
  } catch (error) {
    console.error('Detailed error:', {
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
