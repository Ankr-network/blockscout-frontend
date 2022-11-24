import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import React from 'react';
import { Chain } from '../ChainsList/ChainsListTypes';

export interface ChainsItemQueryProps {
  isMMIndex?: boolean;
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
  isHighlighted?: boolean;
  isLoading: boolean;
  isPremium: boolean;
  totalRequests: string;
  urls: IApiChainURL[];
  handleButtonClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
}

export interface ChainsItemBaseProps
  extends Omit<ChainsItemQueryProps, 'chainId'> {
  isHighlighted?: boolean;
  isLoading: boolean;
  isPremium: boolean;
  totalRequests: string;
  handleButtonClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  handleOriginUrlClick: () => void;
  chainsItemLink: React.ReactNode;
  chainsItemButton?: React.ReactNode;
}
