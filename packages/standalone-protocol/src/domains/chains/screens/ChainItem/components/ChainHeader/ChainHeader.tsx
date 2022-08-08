import React from 'react';

import { Header } from 'modules/common/components/Header';
import { ChainHeaderProps } from './ChainHeaderTypes';

export const ChainHeader = ({ chainId, className = '' }: ChainHeaderProps) => {
  return <Header chainId={chainId} className={className} />;
};
