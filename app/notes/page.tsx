import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  try {
    const { notes, totalPages } = await fetchNotes({ page: 1, perPage: 12, search: '' });
    return (
      <div>
        <NotesClient initialNotes={notes} initialTotalPages={totalPages} />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return <div>Failed to load notes.</div>;
  }
}
