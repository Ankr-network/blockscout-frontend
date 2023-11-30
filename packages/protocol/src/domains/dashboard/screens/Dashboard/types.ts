import { Timeframe } from 'modules/chains/types';

export interface ILayoutProps {
  timeframe: Timeframe;
}

export interface ChainCalls {
  calls: number;
  name: string;
}

export interface ChainCallsMapped extends ChainCalls {
  formattedCallsValue: string;
}
