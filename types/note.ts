export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag?: string;
}

export interface FormValues {
  title: string;
  content: string;
}
