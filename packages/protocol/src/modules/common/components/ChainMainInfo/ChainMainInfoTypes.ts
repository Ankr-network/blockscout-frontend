import { ReactNode } from 'react';

import { StatsTimeframe } from 'domains/chains/types';

export interface ChainMainInfoProps {
  className?: string;
  description: ReactNode;
  isLoading?: boolean;
  label?: ReactNode;
  logoSrc: string;
  name: string;
  statsTimeframe?: StatsTimeframe;
  totalRequests?: string;
}
