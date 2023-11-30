import { ChainID, Timeframe } from 'modules/chains/types';

export interface ChainLayoutProps {
  statsChainId: ChainID;
  detailsChainId: ChainID;
  timeframe: Timeframe;
}
