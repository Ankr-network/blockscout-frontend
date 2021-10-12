import { ReactNode } from 'react';

export interface DetailsBlockProps {
  title: string;
  subtitle: string;
  value: string;
  children?: ReactNode;
  className?: string;
}
