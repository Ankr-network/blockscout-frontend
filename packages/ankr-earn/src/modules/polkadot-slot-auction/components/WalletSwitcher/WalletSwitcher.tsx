import { Box } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import React, { useState } from 'react';

import { getShortStr } from 'modules/common/utils/getShortStr';
import { Button } from 'uiKit/Button';

import { IFetchPolkadotAccountsDataItem } from '../../actions/fetchPolkadotAccounts';
import { ProviderName } from '../../utils/isProviderAvailable';

import { ReactComponent as CloverWalletIcon } from './assets/clover.svg';
import { ReactComponent as PolkadotWalletIcon } from './assets/polkadot.svg';
import { useWalletSwitcherStyles } from './useWalletSwitcherStyles';

const ICONS = {
  [ProviderName.clover]: <CloverWalletIcon />,
  [ProviderName.polkadot]: <PolkadotWalletIcon />,
};

interface WalletSwitcherProps {
  isDisabled?: boolean;
  wallets: Array<IFetchPolkadotAccountsDataItem | void>;
  classMenu?: string;
  currentWallet: string;
  currentProvider?: ProviderName;
  onConnect: (account: string) => () => void;
}

export const WalletSwitcher = ({
  isDisabled,
  wallets,
  classMenu,
  currentWallet,
  currentProvider,
  onConnect,
}: WalletSwitcherProps): JSX.Element | null => {
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

  const isAvailableWallets = !!wallets?.length;
  const endIcon: JSX.Element = isOpened ? (
    <ExpandLessIcon />
  ) : (
    <ExpandMoreIcon />
  );
  const icon = currentProvider && ICONS[currentProvider];

  return (
    <>
      <Button
        className={classes.button}
        color="primary"
        disabled={isDisabled}
        endIcon={isAvailableWallets ? endIcon : null}
        variant="outlined"
        onClick={handleClick}
      >
        <Box mr={1}>{icon}</Box>

        {getShortStr(currentWallet)}
      </Button>

      {isAvailableWallets && (
        <Menu
          keepMounted
          anchorEl={anchorEl}
          classes={{
            paper: classNames(classes.menu, classMenu),
            list: classes.menuList,
          }}
          id="simple-menu"
          open={isOpened}
          onClose={handleClose}
        >
          {(wallets as IFetchPolkadotAccountsDataItem[]).map(wallet => (
            <MenuItem
              key={wallet.address}
              className={classNames({
                [classes.walletSelected]: wallet.address === currentWallet,
              })}
              onClick={handleMenuItemClick(wallet.address)}
            >
              {ICONS[wallet.providerName] && (
                <Box display="inherit" mr={1}>
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
