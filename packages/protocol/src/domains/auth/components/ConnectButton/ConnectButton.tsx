import React, { useCallback, useEffect } from 'react';
import { Box, Button, Fade, Menu, MenuItem } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useStyles } from './useStyles';
import { ReactComponent as MetamaskIcon } from '../../../../assets/img/metamask.svg';
import { LoadableButton } from 'uiKit/LoadableButton';

interface ConnectButtonProps {
  isMobile?: boolean;
}

export const ConnectButton = ({ isMobile = false }: ConnectButtonProps) => {
  const classes = useStyles(isMobile);
  const { handleConnect, handleDisconnect, address, loading } = useAuth();
  const { open, anchorEl, handleOpen, handleClose } = useMenu();

  const handleDisconnectButtonClick = useCallback(() => {
    handleClose();
    handleDisconnect();
  }, [handleClose, handleDisconnect]);

  useEffect(() => {
    if (!address) {
      handleClose();
    }
  }, [address, handleClose]);

  return address ? (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        className={classes.menuButton}
        disabled={loading}
      >
        {!isMobile && <Box component={MetamaskIcon} mr={1.5} />}
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
    <LoadableButton
      variant="text"
      color="primary"
      className={classes.button}
      disableElevation={false}
      onClick={handleConnect}
      disabled={loading}
      loading={loading}
    >
      {t('header.wallet-button')}
    </LoadableButton>
  );
};
