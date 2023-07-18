import { ChainID, Timeframe } from 'domains/chains/types';

export interface ChainLayoutProps {
  statsChainId: ChainID;
  detailsChainId: ChainID;
  timeframe: Timeframe;
}
