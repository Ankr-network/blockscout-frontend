import { ReactNode } from 'react';

export interface ChainMainInfoProps {
  isLoading?: boolean;
  logoSrc: string;
  name: string;
  description: ReactNode;
  className?: string;
  totalRequests?: string;
  isArchive?: boolean;
}
