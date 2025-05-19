import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { text, voiceId } = req.body;
  const apiKey = process.env.ELEVEN_API_KEY;

  try {
    const elevenRes = await axios.post(
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

    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(elevenRes.data);
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).send('Error generando audio');
  }
}
