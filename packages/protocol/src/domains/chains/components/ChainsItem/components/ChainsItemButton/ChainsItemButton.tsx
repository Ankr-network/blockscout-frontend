import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { Chain } from 'domains/chains/types';
import { useChainsItemButtonStyles } from './useChainsItemButtonStyles';

interface IChainsItemButtonProps {
  publicChain: Chain;
}

export const ChainsItemButton = ({ publicChain }: IChainsItemButtonProps) => {
  const { classes } = useChainsItemButtonStyles();

  return (
    <AddNetworkButton
      publicChain={publicChain}
      size="medium"
      className={classes.buttonAddNetwork}
    />
  );
};
