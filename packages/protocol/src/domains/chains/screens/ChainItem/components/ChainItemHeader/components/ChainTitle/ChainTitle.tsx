import { IApiChain } from 'domains/chains/api/queryChains';
import { useChainTitleStyles } from './ChainTitleStyles';

export interface ChainTitleProps {
  chain: IApiChain;
}

export const ChainTitle = ({ chain: { name } }: ChainTitleProps) => {
  const classes = useChainTitleStyles();

  return <div className={classes.chainTitle}>{name}</div>;
};
