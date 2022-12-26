import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { Chain } from '../ChainsList/ChainsListTypes';
import { useChainsItemStyles } from './useChainsItemStyles';

interface IChainsItemButtonProps {
  publicChain: Chain | undefined;
}

export const ChainsItemButton = ({ publicChain }: IChainsItemButtonProps) => {
  const classes = useChainsItemStyles(false);

  return (
    <>
      {publicChain && (
        <AddNetworkButton
          publicChain={publicChain}
          size="medium"
          className={classes.buttonAddNetwork}
        />
      )}
    </>
  );
};
