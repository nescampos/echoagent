import { NextRequest, NextResponse } from 'next/server';

// TODO: Initialize ElevenLabs client
// import { ElevenLabsClient } from 'elevenlabs';
//
// const elevenlabs = new ElevenLabsClient({
//   apiKey: process.env.ELEVENLABS_API_KEY,
// });

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // TODO: Use ElevenLabs to generate speech
    // const audio = await elevenlabs.textToSpeech.convert(voiceId || 'Josh', {
    //   text,
    //   model_id: 'eleven_monolingual_v1',
    // });
    //
    // // Convert audio stream to buffer
    // const audioBuffer = await audio.arrayBuffer();
    //
    // return new NextResponse(audioBuffer, {
    //   headers: {
    //     'Content-Type': 'audio/mpeg',
    //     'Content-Length': audioBuffer.byteLength.toString(),
    //   },
    // });

    // Placeholder response - remove when ElevenLabs is implemented
    return NextResponse.json({
      message: 'ElevenLabs integration not yet implemented',
      todo: 'Configure ELEVENLABS_API_KEY environment variable and implement the conversion',
      textLength: text.length,
      voiceId: voiceId || 'default',
    });
  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
