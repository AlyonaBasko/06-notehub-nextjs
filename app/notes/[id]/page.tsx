import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

export default async function NoteDetailsPage({ params: { id } }: { params: { id: string } }) {
  const qc = new QueryClient();
  const numId = Number(id);
  await qc.prefetchQuery({
    queryKey: ['note', numId],
    queryFn: () => fetchNoteById(numId),
    staleTime: 1000 * 60, // 1 хвилина
  });
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={numId} />
    </HydrationBoundary>
  );
}
