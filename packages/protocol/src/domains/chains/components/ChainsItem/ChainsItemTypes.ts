import React from 'react';

import { Chain, ChainID, ChainURL, Timeframe } from 'domains/chains/types';

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
