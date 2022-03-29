import React from 'react';

import { Header } from 'modules/common/components/Header';
import { ChainHeaderProps } from './ChainHeaderTypes';
import { ErigonHeader } from './ErigonHeader';
import { ChainId } from 'domains/chains/api/chain';

export const ChainHeader = ({ chainId, className = '' }: ChainHeaderProps) => {
  if (chainId === ChainId.Erigonbsc) {
    return <ErigonHeader chainId={chainId} className={className} />;
  }

  return <Header chainId={chainId} className={className} />;
};
