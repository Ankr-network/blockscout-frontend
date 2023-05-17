import { ReactNode } from 'react';

import { NoResult } from 'domains/chains/components/ChainsList/NoResult';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';
import { Chain } from 'domains/chains/types';

interface ChainsListProps {
  chains: Chain[];
  children: ReactNode;
}

export const ChainsList = ({ chains, children }: ChainsListProps) => {
  const { classes } = useChainListStyles();

  if (chains.length === 0) {
    return <NoResult />;
  }

  return <div className={classes.root}>{children}</div>;
};