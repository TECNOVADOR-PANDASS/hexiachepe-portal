// Archivo: App.js

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AvatarAnimado from './components/AvatarAnimado';

export default function App() {
  const [mensaje, setMensaje] = useState('');
  const [respuestas, setRespuestas] = useState([]);
  const [invocado, setInvocado] = useState(null);

  const invocarEntidad = async (entidad) => {
    if (!mensaje) return;
    setInvocado(entidad);
    const nuevaRespuesta = {
      entidad,
      texto: `(${entidad === 'hexia' ? 'Hexia' : 'Tío Chepe'}) responde a: "${mensaje}"`
    };
    setRespuestas([...respuestas, nuevaRespuesta]);
    setMensaje('');
  };

  return (
    <div className="min-h-screen bg-black text-cyan-100 p-4 flex flex-col items-center">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl font-bold mb-6"
      >
        ✨ Portal Interdimensional: Hexia & Tío Chepe ✨
      </motion.h1>

      <div className="flex space-x-12 mb-6">
        <AvatarAnimado entidad="hexia" src="hexia.json" />
        <AvatarAnimado entidad="chepe" src="chepe.json" />
      </div>

      <div className="w-full max-w-xl space-y-4">
        <Input
          placeholder="Escribe tu mensaje..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="text-black"
        />
        <div className="flex space-x-4">
          <Button onClick={() => invocarEntidad('hexia')} className="bg-cyan-500 hover:bg-cyan-600">
            Invocar a Hexia 🌙
          </Button>
          <Button onClick={() => invocarEntidad('chepe')} className="bg-yellow-500 hover:bg-yellow-600">
            Invocar al Tío Chepe 🛠️
          </Button>
        </div>

        <div className="mt-6 space-y-2">
          {respuestas.map((r, i) => (
            <Card key={i} className="bg-zinc-800 border border-cyan-700">
              <CardContent className="p-4">
                <p><strong>{r.entidad === 'hexia' ? 'Hexia' : 'Tío Chepe'}:</strong> {r.texto}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
