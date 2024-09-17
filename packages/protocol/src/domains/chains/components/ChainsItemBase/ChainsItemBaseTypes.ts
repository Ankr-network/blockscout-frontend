import { Chain, ChainID, ChainURL, Timeframe } from '@ankr.com/chains-list';

export interface ChainsItemQueryProps {
  chain: Chain;
  publicChain?: Chain;
  chainId: ChainID;
  description?: string;
  links: ChainURL[];
  name: string;
  period: string;
  timeframe: Timeframe;
  hasPremiumDialog?: boolean;
  isPublic?: boolean;
  hasTotalRequestsLabel?: boolean;
}

export interface ChainsItemProps extends Omit<ChainsItemQueryProps, 'chainId'> {
  isHighlighted?: boolean;
  isLoading: boolean;
  hasPrivateAccess?: boolean;
  totalRequests: string;
  hasConnectWalletMessage?: boolean;
  urls: ChainURL[];
  handleButtonClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  dummyMessage: string;
}

type ToOmit =
  | 'dummyMessage'
  | 'hasConnectWalletMessage'
  | 'hasPrivateAccess'
  | 'urls';

export interface ChainsItemBaseProps extends Omit<ChainsItemProps, ToOmit> {
  chainsItemLink: React.ReactNode;
  chainsItemButton?: React.ReactNode;
}
