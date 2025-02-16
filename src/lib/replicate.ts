import Replicate from 'replicate';

// Initialize with auth token from environment variable
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

export const generateMusic = async (input: object): Promise<string> => {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('Missing Replicate API token');
  }

  try {
    console.log('Calling Replicate with input:', input);
    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      { input }
    );
    console.log('Replicate response:', output);
    
    return output as string;
  } catch (error) {
    console.error('Detailed Replicate error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};
