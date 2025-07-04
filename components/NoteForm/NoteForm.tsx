'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues } from '@/types/note';

interface NoteFormProps {
  onSubmit: (note: FormValues) => void;
  onClose: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onClose }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      content: '',
      tag: 'personal',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      tag: Yup.string().required('Tag is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);  
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      {formik.touched.title && formik.errors.title && (
        <div style={{ color: 'red' }}>{formik.errors.title}</div>
      )}

      <textarea
        name="content"
        placeholder="Content"
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      {formik.touched.content && formik.errors.content && (
        <div style={{ color: 'red' }}>{formik.errors.content}</div>
      )}

      <select
        name="tag"
        value={formik.values.tag}
        onChange={formik.handleChange}
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="study">Study</option>
      </select>
      {formik.touched.tag && formik.errors.tag && (
        <div style={{ color: 'red' }}>{formik.errors.tag}</div>
      )}

      <button type="submit">
        Add Note
      </button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default NoteForm;
