import { Note, FormValues } from '@/types/note';
import axios from 'axios';

const API_BASE = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search.trim();

  const { data } = await axiosInstance.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag?: string; // або інший відповідний тип
}

export async function createNote(note: FormValues) {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  return response.json();
}

export interface DeleteNoteResponse {
  message: string;
  note: Note;
}

export async function deleteNote(id: number): Promise<DeleteNoteResponse> {
  const { data } = await axiosInstance.delete<DeleteNoteResponse>(`/notes/${id}`);
  return data;
}

export const fetchNoteById = async (id: number) => {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
};

