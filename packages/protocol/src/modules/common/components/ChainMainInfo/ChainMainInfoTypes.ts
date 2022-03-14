import { ReactNode } from 'react';

export interface ChainMainInfoProps {
  logoSrc: string;
  name: string;
  description: ReactNode;
  className?: string;
  totalRequests?: string | number;
  isArchive?: boolean;
}
