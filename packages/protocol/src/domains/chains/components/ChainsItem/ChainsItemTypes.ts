import React from 'react';

import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Chain, Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';

export interface ChainsItemQueryProps {
  chain: Chain;
  publicChain?: Chain;
  chainId: ChainID;
  description?: string;
  links: IApiChainURL[];
  name: string;
  period: string;
  timeframe: Timeframe;
  hasPremiumDialog?: boolean;
  isPublic?: boolean;
}

export interface ChainsItemProps extends Omit<ChainsItemQueryProps, 'chainId'> {
  isHighlighted?: boolean;
  isLoading: boolean;
  hasPrivateAccess?: boolean;
  totalRequests: string;
  hasConnectWalletMessage?: boolean;
  urls: IApiChainURL[];
  handleButtonClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  dummyMessage: string;
}
