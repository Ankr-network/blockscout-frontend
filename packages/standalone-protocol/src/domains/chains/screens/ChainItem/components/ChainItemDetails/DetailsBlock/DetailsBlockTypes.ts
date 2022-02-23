import { ReactNode } from 'react';

export interface DetailsBlockProps {
  title: string;
  value: string | number;
  description?: ReactNode;
  className?: string;
  loading?: boolean;
}
