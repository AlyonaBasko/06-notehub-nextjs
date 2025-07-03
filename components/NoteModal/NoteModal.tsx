import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import { FormValues } from '@/types/note';

interface NoteModalProps {
  onClose: () => void;
  onSubmit: (noteData: FormValues) => void;
}

export default function NoteModal({ onClose, onSubmit}: NoteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden'; 
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = ''; 
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onBackdropClick}>
    <div className={css.modal}>
    <NoteForm onSubmit={onSubmit} onClose={onClose} />
    </div>
  </div>,
  document.body
);
}
