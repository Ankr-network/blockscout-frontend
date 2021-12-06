import { ReactNode } from 'react';

export interface DetailsBlockProps {
  title: string;
  value: string | number;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  hasDot?: boolean;
}
