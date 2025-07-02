import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-app.onrender.com/notes';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const config = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await axios.get(BASE_URL, config);
  return Array.isArray(res.data) ? res.data : res.data.notes ?? [];
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await axios.get(`${BASE_URL}/${id}`, config);
  return res.data;
};

export const createNote = async (note: Omit<Note, 'id'>) => {
  const res = await axios.post(BASE_URL, note, config);
  return res.data;
};

export const deleteNote = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`, config);
};
