import { createClient } from '@supabase/supabase-js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function writeToLocalDB(text, voiceId) {
  const db = await open({
    filename: './db/registro.db',
    driver: sqlite3.Database
  });
  await db.exec('CREATE TABLE IF NOT EXISTS mensajes (texto TEXT, voz TEXT, fecha DATETIME DEFAULT CURRENT_TIMESTAMP)');
  await db.run('INSERT INTO mensajes (texto, voz) VALUES (?, ?)', [text, voiceId]);
}

export async function writeToSupabase(text, voiceId) {
  await supabase.from('mensajes').insert([{ texto: text, voz: voiceId }]);
}
