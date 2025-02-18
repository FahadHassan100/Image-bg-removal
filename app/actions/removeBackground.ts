'use server'

import * as fal  from '@fal-ai/serverless-client'

const client = fal.config({
  credentials: process.env.FAL_KEY || ''
})

export async function removeBackground(imageUrl: string): Promise<string> {
  try {

    const result:any = await fal.run('remove-background', {
      input: {
        image_url: imageUrl,
        format: 'png'
      }
    })

    return result.image_url
  } catch (error) {
    console.error('Error removing background:', error)
    throw new Error('Failed to remove background')
  }
} 