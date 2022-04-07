import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain } from '../ChainsList/ChainsListTypes';

export interface ChainsItemQueryProps {
  logoSrc: string;
  name: string;
  description?: string;
  period: string;
  links: IApiChainURL[];
  chain: Chain;
  chainId: string;
}

export interface ChainsItemProps extends Omit<ChainsItemQueryProps, 'chainId'> {
  totalRequests: string;
  isLoading: boolean;
}
