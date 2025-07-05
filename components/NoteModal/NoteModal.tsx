'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import NoteForm from '../NoteForm/NoteForm';
import { createNote } from '@/lib/api';
import { FormValues, Note } from '@/types/note';
import css from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
  onSubmit: (noteData: FormValues) => void; 
}

export default function NoteModal({ onClose }: NoteModalProps) {
  const queryClient = useQueryClient();


  const mutation = useMutation<Note, Error, FormValues>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  
  const onBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  
  const handleSubmit = (noteData: FormValues) => {
    mutation.mutate(noteData);
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeBtn} aria-label="Close modal">×</button>
        <NoteForm onSubmit={handleSubmit} onClose={onClose} />
        {mutation.isError && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            Error: {(mutation.error as Error).message}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
