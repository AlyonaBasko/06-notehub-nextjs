import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import type PageProps from 'next/types';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const id = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    staleTime: 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
