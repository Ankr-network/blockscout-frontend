import { Chain } from 'domains/chains/types';

import { useChainTitleStyles } from './ChainTitleStyles';

export interface ChainTitleProps {
  chain: Chain;
}

export const ChainTitle = ({ chain: { name } }: ChainTitleProps) => {
  const { classes } = useChainTitleStyles();

  return <div className={classes.chainTitle}>{name}</div>;
};
