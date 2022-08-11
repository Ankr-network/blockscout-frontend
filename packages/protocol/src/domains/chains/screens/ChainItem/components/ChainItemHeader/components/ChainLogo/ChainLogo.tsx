import { IApiChain } from 'domains/chains/api/queryChains';
import { useChainLogoStyles } from './ChainLogoStyles';

export interface ChainLogoProps {
  chain: IApiChain;
}

export const ChainLogo = ({ chain: { icon, name } }: ChainLogoProps) => {
  const classes = useChainLogoStyles();

  return icon ? (
    <img alt={`${name} logo`} className={classes.chainLogo} src={icon} />
  ) : null;
};
