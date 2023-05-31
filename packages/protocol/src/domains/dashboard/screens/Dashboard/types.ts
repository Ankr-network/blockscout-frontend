import { Timeframe } from 'domains/chains/types';

export interface ILayoutProps {
  timeframe: Timeframe;
}

export interface ChainCalls {
  calls: number;
  name: string;
}
