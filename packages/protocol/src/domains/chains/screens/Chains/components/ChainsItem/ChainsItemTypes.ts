import { Chain } from '../ChainsList/ChainsListTypes';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { StatsTimeframe } from 'domains/chains/types';

export interface ChainsItemQueryProps {
  chain: Chain;
  chainId: string;
  description?: string;
  links: IApiChainURL[];
  logoSrc: string;
  name: string;
  period: string;
  statsTimeframe: StatsTimeframe;
}

export interface ChainsItemProps extends Omit<ChainsItemQueryProps, 'chainId'> {
  isLoading: boolean;
  isPremium: boolean;
  totalRequests: string;
}
