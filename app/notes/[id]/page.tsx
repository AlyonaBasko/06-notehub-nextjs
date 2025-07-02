import NoteDetailsClient from './NoteDetails.client';

export default function NoteDetailsPage({ params }: { params: { id: string } }) {
  return <NoteDetailsClient params={params} />;
}