import React, { useState } from 'react';
import { FormValues } from '../../types/note';

interface NoteFormProps {
  onSubmit: (note: FormValues) => void;
  onClose: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button type="submit">Add Note</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default NoteForm;
