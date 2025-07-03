import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const { notes, totalPages } = await fetchNotes({ page: 1, perPage: 12, search: '' });

  return (
    <div>
      <NotesClient initialNotes={notes} initialTotalPages={totalPages} />
    </div>
  );
}