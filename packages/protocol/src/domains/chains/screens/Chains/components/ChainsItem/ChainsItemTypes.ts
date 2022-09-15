import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { Chain } from '../ChainsList/ChainsListTypes';

export interface ChainsItemQueryProps {
  chain: Chain;
  publicChain?: Chain;
  chainId: ChainID;
  description?: string;
  links: IApiChainURL[];
  logoSrc: string;
  name: string;
  period: string;
  timeframe: Timeframe;
}

export interface ChainsItemProps extends Omit<ChainsItemQueryProps, 'chainId'> {
  isLoading: boolean;
  isPremium: boolean;
  totalRequests: string;
}
