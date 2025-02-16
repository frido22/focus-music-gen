import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const apiToken = serverRuntimeConfig.REPLICATE_API_TOKEN;

if (!apiToken) {
  throw new Error('Missing Replicate API token');
}

export async function generateMusic(input: object): Promise<string> {
  console.log('Calling Replicate with input:', input);

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      input: input
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Replicate API error: ${error}`);
  }

  const prediction = await response.json();
  console.log('Initial prediction:', prediction);

  // Poll for completion
  const maxAttempts = 60; // 5 minutes with 5-second intervals
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!statusResponse.ok) {
      throw new Error('Failed to check prediction status');
    }

    const result = await statusResponse.json();
    console.log('Prediction status:', result.status);

    if (result.status === 'succeeded') {
      console.log('Final output:', result.output);
      return result.output;
    }

    if (result.status === 'failed') {
      throw new Error('Music generation failed');
    }

    // Wait 5 seconds before next attempt
    await new Promise(resolve => setTimeout(resolve, 5000));
    attempts++;
  }

  throw new Error('Timeout waiting for music generation');
}
