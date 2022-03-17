import { Chain } from '../ChainsList/ChainsListTypes';

export interface ChainsItemProps {
  totalRequests: string;
  isLoading: boolean;
  logoSrc: string;
  name: string;
  description?: string;
  period: string;
  links: string[];
  onButtonClick: () => void;
  chain: Chain;
}
