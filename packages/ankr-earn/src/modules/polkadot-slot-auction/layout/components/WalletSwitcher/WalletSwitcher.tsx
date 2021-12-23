import { Box } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { Address } from 'modules/api/provider';
import { getShortStr } from 'modules/common/utils/getShortStr';
import React, { useState } from 'react';
import { Button } from 'uiKit/Button';
import { ProviderName } from '../../../utils/isProviderAvailable';
import { ReactComponent as CloverWalletIcon } from './assets/clover.svg';
import { ReactComponent as PolkadotWalletIcon } from './assets/polkadot.svg';
import { useWalletSwitcherStyles } from './useWalletSwitcherStyles';

const ICONS = {
  [ProviderName.clover]: <CloverWalletIcon />,
  [ProviderName.polkadot]: <PolkadotWalletIcon />,
};

interface WalletSwitcherProps {
  wallets: { providerName: ProviderName; address: Address }[];
  currentWallet: string;
  onConnect: (account: string) => () => void;
  currentProvider?: ProviderName;
}

export const WalletSwitcher = ({
  wallets,
  currentWallet,
  currentProvider,
  onConnect,
}: WalletSwitcherProps) => {
  const classes = useWalletSwitcherStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpened = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (wallet: string) => () => {
    if (currentWallet !== wallet) {
      onConnect(wallet)();
    }

    handleClose();
  };

  if (!wallets) {
    return null;
  }

  const isAvailableWallets: boolean = !!wallets?.length;
  const endIcon: JSX.Element = isOpened ? (
    <ExpandLessIcon />
  ) : (
    <ExpandMoreIcon />
  );
  const icon = currentProvider && ICONS[currentProvider];

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleClick}
        endIcon={isAvailableWallets ? endIcon : null}
      >
        <Box mr={1}>{icon}</Box>
        {getShortStr(currentWallet)}
      </Button>

      {isAvailableWallets && (
        <Menu
          classes={{ paper: classes.menu, list: classes.menuList }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={isOpened}
          onClose={handleClose}
        >
          {wallets.map(wallet => (
            <MenuItem
              onClick={handleMenuItemClick(wallet.address)}
              key={wallet.address}
              className={classNames({
                [classes.walletSelected]: wallet.address === currentWallet,
              })}
            >
              {ICONS[wallet.providerName] && (
                <Box mr={1} display="inherit">
                  {ICONS[wallet.providerName]}
                </Box>
              )}
              {getShortStr(wallet.address)}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};
