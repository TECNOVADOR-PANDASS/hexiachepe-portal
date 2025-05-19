import axios from 'axios';
import { writeToLocalDB, writeToSupabase } from '../db/memory.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { text, voiceId } = req.body;
  const apiKey = process.env.ELEVEN_API_KEY;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      { text, model_id: "eleven_multilingual_v2" },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        responseType: 'arraybuffer'
      }
    );

    // Guardar en ambas memorias
    await writeToLocalDB(text, voiceId);
    await writeToSupabase(text, voiceId);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).send('Error generando audio');
  }
}
