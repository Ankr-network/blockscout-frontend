import { Chain } from 'domains/chains/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
import { useChainLogoStyles } from './ChainLogoStyles';

export interface ChainLogoProps {
  chain: Chain;
}

export const ChainLogo = ({ chain: { id, name } }: ChainLogoProps) => {
  const { classes } = useChainLogoStyles();

  const icon = useChainIcon(id);

  return icon ? (
    <img alt={`${name} logo`} className={classes.chainLogo} src={icon} />
  ) : null;
};
