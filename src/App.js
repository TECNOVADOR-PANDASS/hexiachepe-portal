import { useState } from 'react';
import AvatarAnimado from './components/AvatarAnimado';

const VOICE_ID_HEXIA = 'TU_VOICE_ID_HEXIA';
const VOICE_ID_CHEPE = 'TU_VOICE_ID_CHEPE';

export default function App() {
  const [texto, setTexto] = useState('');

  const speakText = async (texto, vozId) => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: texto, voiceId: vozId })
      });
      const buffer = await res.arrayBuffer();
      const audio = new Audio(URL.createObjectURL(new Blob([buffer], { type: 'audio/mpeg' })));
      audio.play();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="App" style={{ background: '#000', color: '#0ff', padding: 40, textAlign: 'center' }}>
      <h1>🌌 Hexia & Tío Chepe Portal</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 30 }}>
        <AvatarAnimado entidad="hexia" src="/hexia.json" />
        <AvatarAnimado entidad="chepe" src="/chepe.json" />
      </div>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu mensaje..."
        style={{ width: '80%', padding: 10, fontSize: 16 }}
      />
      <br /><br />
      <button onClick={() => speakText(texto, VOICE_ID_HEXIA)}>Hablar como Hexia 🌙</button>
      <button onClick={() => speakText(texto, VOICE_ID_CHEPE)} style={{ marginLeft: 20 }}>Hablar como Tío Chepe 🛠️</button>
    </div>
  );
}
