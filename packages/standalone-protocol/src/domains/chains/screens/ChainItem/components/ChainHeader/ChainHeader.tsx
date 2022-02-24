import React from 'react';

import { Header } from 'modules/common/components/Header';
import { ChainHeaderProps } from './ChainHeaderTypes';
import { ErigonHeader } from './ErigonHeader';

export const ChainHeader = ({ chainId, className = '' }: ChainHeaderProps) => {
  if (chainId === 'erigonbsc') {
    return <ErigonHeader chainId={chainId} className={className} />;
  }

  return <Header chainId={chainId} className={className} />;
};
