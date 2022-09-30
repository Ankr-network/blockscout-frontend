import { ReactNode } from 'react';

import { Timeframe } from 'domains/chains/types';

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
}
