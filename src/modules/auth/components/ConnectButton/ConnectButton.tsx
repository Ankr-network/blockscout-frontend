import React, { useCallback } from 'react';
import { Box, Button, Fade, Menu, MenuItem } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useMenu } from '../../../common/hooks/useMenu';
import { useStyles } from './useStyles';
import { ReactComponent as MetamaskIcon } from '../../../../assets/img/metamask.svg';

interface ConnectButtonProps {
  isMobile?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ConnectButton = ({ isMobile = false }: ConnectButtonProps) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const { handleConnect, handleDisconnect, address, loading } = useAuth();
  const { open, anchorEl, handleOpen, handleClose } = useMenu();

  const handleDisconnectButtonClick = useCallback(() => {
    handleClose();
    handleDisconnect();
  }, [handleClose, handleDisconnect]);

  const handle = () => {
    throw new Error('test');
  };

  return address ? (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        className={classes.menuButton}
        disabled={loading}
      >
        <Box component={MetamaskIcon} mr={1.5} />
        {shrinkAddress(address)}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        TransitionComponent={Fade}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled={loading} onClick={handleDisconnectButtonClick}>
          {t('header.disconnect')}
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Button
      variant="text"
      color="primary"
      disableElevation={false}
      onClick={handle}
      disabled={loading}
    >
      {t('header.wallet-button')}
    </Button>
  );
};
