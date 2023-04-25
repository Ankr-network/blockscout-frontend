import { ReactNode } from 'react';

import { Chain } from 'domains/chains/types';
import { NoResult } from 'domains/chains/components/ChainsList/NoResult';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';

export interface IChainsListProps {
  chains: Chain[];
  children: ReactNode;
}

export const ChainsList = ({ chains, children }: IChainsListProps) => {
  const { classes } = useChainListStyles();

  if (chains.length === 0) {
    return <NoResult />;
  }

  return <div className={classes.root}>{children}</div>;
};
