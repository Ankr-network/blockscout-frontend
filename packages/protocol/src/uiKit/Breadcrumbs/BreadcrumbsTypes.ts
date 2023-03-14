import { ReactNode } from 'react';

export interface BreadcrumbItem {
  title: string;
  link?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  customBreakpoint?: number;
  items: BreadcrumbItem[];
  userLabel: ReactNode;
}
