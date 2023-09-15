import { ReactNode } from 'react';

import { NoResult } from 'domains/chains/components/ChainsList/NoResult';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';

export interface IChainsListProps<T> {
  chains: T[];
  children: ReactNode;
}

export function ChainsList<T>({ chains, children }: IChainsListProps<T>) {
  const { classes } = useChainListStyles();

  if (chains.length === 0) {
    return <NoResult />;
  }

  return <div className={classes.root}>{children}</div>;
}
