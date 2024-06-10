import { Timeframe } from 'modules/chains/types';

export interface ILayoutProps {
  timeframe: Timeframe;
  selectedProjectId?: string;
}

export interface ChainCalls {
  calls: number;
  name: string;
}
