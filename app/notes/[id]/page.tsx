import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const qc = new QueryClient();
  const numId = Number(params.id);

  await qc.prefetchQuery({
    queryKey: ['note', numId],
    queryFn: () => fetchNoteById(numId),
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={numId} />
    </HydrationBoundary>
  );
}

