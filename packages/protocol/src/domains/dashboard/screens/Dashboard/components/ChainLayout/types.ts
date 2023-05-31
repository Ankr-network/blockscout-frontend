import { ChainID, Timeframe } from 'domains/chains/types';

export interface ChainLayoutProps {
  statsChainId: ChainID;
  selectedChainId: ChainID;
  detailsChainId: ChainID;
  timeframe: Timeframe;
}
