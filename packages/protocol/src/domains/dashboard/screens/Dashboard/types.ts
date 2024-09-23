import { Timeframe } from '@ankr.com/chains-list';

export interface ILayoutProps {
  timeframe: Timeframe;
  selectedProjectId?: string;
}

export interface ChainCalls {
  calls: number;
  name: string;
}
