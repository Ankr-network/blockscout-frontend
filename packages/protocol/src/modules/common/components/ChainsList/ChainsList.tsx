import { ReactNode } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';

import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';

import { NoResult } from '../NoResult';

export interface IChainsListProps<T> {
  chains: T[];
  children: ReactNode;
  isLoading?: boolean;
}

export function ChainsList<T>({
  chains,
  children,
  isLoading,
}: IChainsListProps<T>) {
  const { classes } = useChainListStyles();

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (chains.length === 0) {
    return <NoResult />;
  }

  return <div className={classes.root}>{children}</div>;
}
