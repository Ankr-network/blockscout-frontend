import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { Chain } from '../ChainsList/ChainsListTypes';
import { useStyles } from './ChainsItemStyles';

interface IChainsItemButtonProps {
  publicChain: Chain | undefined;
}

export const ChainsItemButton = ({ publicChain }: IChainsItemButtonProps) => {
  const classes = useStyles(false);

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
