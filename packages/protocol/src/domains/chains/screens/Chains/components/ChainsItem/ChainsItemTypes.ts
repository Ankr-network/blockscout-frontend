import { Chain } from '../ChainsList/ChainsListTypes';

export interface ChainsItemProps {
  logoSrc: string;
  name: string;
  description?: string;
  period: string;
  links: string[];
  onButtonClick: () => void;
  chain: Chain;
  totalRequests?: string | number;
}
