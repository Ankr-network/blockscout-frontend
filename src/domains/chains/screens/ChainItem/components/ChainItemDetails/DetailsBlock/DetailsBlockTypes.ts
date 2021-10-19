import { ReactNode } from 'react';

export interface DetailsBlockProps {
  title: string;
  subtitle?: string;
  value: string | number;
  children?: ReactNode;
  className?: string;
}
