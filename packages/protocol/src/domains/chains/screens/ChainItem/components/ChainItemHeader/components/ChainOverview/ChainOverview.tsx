import { ReactNode } from 'react';

import { Chain } from 'modules/chains/types';
import { ChainDescription } from 'modules/chains/components/ChainDescription';

import { useChainOverviewStyles } from './ChainOverviewStyles';

export interface ChainOverviewProps {
  chain: Chain;
  addToProjectButton?: ReactNode;
  subchainLabels?: string[];
}

export const ChainOverview = ({
  addToProjectButton,
  chain,
  subchainLabels,
}: ChainOverviewProps) => {
  const { classes } = useChainOverviewStyles();

  return (
    <div className={classes.chainOverview}>
      <div className={classes.left}>
        <ChainDescription chain={chain} subchainLabels={subchainLabels} />
      </div>
      <div className={classes.right}>{addToProjectButton}</div>
    </div>
  );
};
