'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes, createNote, deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function NotesPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleCreateNote = (note: Omit<Note, 'id'>) => {
    createMutation.mutate(note);
  };

  const handleDeleteNote = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredNotes = Array.isArray(notes)
  ? notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong: {(error as Error).message}</p>;

  return (
    <>
      <SearchBox value={searchTerm} onChange={setSearchTerm} />
      <NoteForm onSubmit={handleCreateNote} />
      {filteredNotes && (
        <NoteList notes={filteredNotes} onDelete={handleDeleteNote} />
      )}
    </>
  );
}
