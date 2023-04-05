import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { Chain } from 'domains/chains/types';
import { useChainsItemButtonStyles } from './useChainsItemButtonStyles';

interface IChainsItemButtonProps {
  chain: Chain;
}

export const ChainsItemButton = ({ chain }: IChainsItemButtonProps) => {
  const { classes } = useChainsItemButtonStyles();

  return (
    <AddNetworkButton
      chain={chain}
      size="medium"
      className={classes.buttonAddNetwork}
    />
  );
};
