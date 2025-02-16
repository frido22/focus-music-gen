import { NextResponse } from 'next/server';
import getConfig from 'next/config';
import { MusicPreferences } from '@/types';
import { generateMusicFromPreferences } from '@/services/musicService';

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
    } catch {
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

    const audioUrl = await generateMusicFromPreferences(preferences);
    return NextResponse.json({ success: true, audioUrl });
    
  } catch (err) {
    console.error('API Error:', {
      name: err instanceof Error ? err.name : 'Unknown',
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to generate music'
      },
      { status: 500 }
    );
  }
}
