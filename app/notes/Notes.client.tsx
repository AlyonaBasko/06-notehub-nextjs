'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';

export default function NotesClient() {
  const { data: notes, isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <ul>
      {notes?.map(note => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}
