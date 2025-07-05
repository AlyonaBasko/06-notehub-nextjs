'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { FormValues, Note, NoteTag } from '@/types/note';

interface NoteFormProps {
  onClose: () => void;
}

const TAG_OPTIONS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(1000, 'Content cannot exceed 1000 characters'),
  tag: Yup.mixed<NoteTag>()
    .oneOf(TAG_OPTIONS, 'Invalid tag')
    .required('Tag is required'),
});

function ErrorMessage({ error }: { error?: string }) {
  if (!error) return null;
  return <div style={{ color: 'red' }}>{error}</div>;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Note, Error, FormValues>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      content: '',
      tag: 'Todo',
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <ErrorMessage error={formik.touched.title && formik.errors.title ? formik.errors.title : undefined} />

      <textarea
        name="content"
        placeholder="Content"
        value={formik.values.content}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <ErrorMessage error={formik.touched.content && formik.errors.content ? formik.errors.content : undefined} />

      <select
        name="tag"
        value={formik.values.tag}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {TAG_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessage error={formik.touched.tag && formik.errors.tag ? formik.errors.tag : undefined} />

      <button type="submit" disabled={mutation.status === 'pending'}>
  {mutation.status === 'pending' ? 'Adding...' : 'Add Note'}
</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>

      {mutation.isError && (
        <div style={{ color: 'red' }}>
          Failed to create note: {(mutation.error as Error).message}
        </div>
      )}
    </form>
  );
}
