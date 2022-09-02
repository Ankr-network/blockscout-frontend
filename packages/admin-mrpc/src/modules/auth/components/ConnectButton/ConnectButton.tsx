import React, { useCallback, useEffect } from 'react';
import { Box, Button, Fade, Menu, MenuItem } from '@material-ui/core';

import { LoadableButton } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useAppSelector } from 'store/useAppSelector';

import { useLazyAuthConnectQuery } from '../../actions/connect';
import { useLazyAuthDisconnectQuery } from '../../actions/disconnect';

import { useStyles } from './useStyles';

interface ConnectButtonProps {
  isMobile?: boolean;
}

export const ConnectButton = ({ isMobile = false }: ConnectButtonProps) => {
  const classes = useStyles(isMobile);
  const address = useAppSelector(store => store.auth.address);
  const [authConnect, { isLoading: isLoadingConnect }] =
    useLazyAuthConnectQuery();
  const [authDisconnect, { isLoading: isLoadingDisconnect }] =
    useLazyAuthDisconnectQuery();

  const { open, anchorEl, handleOpen, handleClose } = useMenu();
  const loading = isLoadingConnect || isLoadingDisconnect;
  const handleDisconnectButtonClick = useCallback(() => {
    handleClose();
    authDisconnect();
  }, [handleClose, authDisconnect]);

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
        {!isMobile && <Box mr={1.5}>Metamask icon</Box>}
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
      onClick={() => authConnect()}
      disabled={loading}
      loading={loading}
    >
      {t('header.wallet-button')}
    </LoadableButton>
  );
};
