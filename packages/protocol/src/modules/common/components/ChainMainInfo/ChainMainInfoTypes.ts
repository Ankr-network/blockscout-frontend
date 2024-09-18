import { ReactNode } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

export interface ChainMainInfoProps {
  className?: string;
  description: ReactNode;
  isHighlighted?: boolean;
  isLoading?: boolean;
  label?: ReactNode;
  logoSrc: string;
  name: string;
  timeframe?: Timeframe;
  totalRequests?: string;
  hasTotalRequestsLabel?: boolean;
}
