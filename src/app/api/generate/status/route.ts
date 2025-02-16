import { NextResponse } from 'next/server';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const apiToken = serverRuntimeConfig.REPLICATE_API_TOKEN;

if (!apiToken) {
  throw new Error('Missing Replicate API token');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const predictionId = searchParams.get('id');

    if (!predictionId) {
      return NextResponse.json(
        { success: false, error: 'Prediction ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check prediction status');
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      status: result.status,
      output: result.output,
      error: result.error
    });

  } catch (err) {
    console.error('Status check error:', err);
    return NextResponse.json(
      { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to check generation status'
      },
      { status: 500 }
    );
  }
}
