import React, { useCallback, useEffect, useState } from 'react';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { LoadableButton } from 'ui';

import { t } from 'modules/i18n/utils/intl';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useAppSelector } from 'store/useAppSelector';

import { useLazyAuthDisconnectQuery } from '../../actions/disconnect';
import { useStyles } from './useStyles';
import { SignInDialog } from '../SignInDialog';
import { ProviderIcon } from '../ProviderIcon';

export const ConnectButton = () => {
  const { classes } = useStyles();
  const email = useAppSelector(store => store.auth.email);
  const provider = useAppSelector(store => store.auth.provider);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = useCallback(() => setIsOpen(true), [setIsOpen]);
  const handleCloseDialog = useCallback(() => setIsOpen(false), [setIsOpen]);

  const [authDisconnect, { isLoading: isLoadingDisconnect }] =
    useLazyAuthDisconnectQuery();

  const { open, anchorEl, handleOpen, handleClose } = useMenu();
  const handleDisconnectButtonClick = useCallback(() => {
    handleClose();
    authDisconnect();
  }, [handleClose, authDisconnect]);

  useEffect(() => {
    if (!email) {
      handleClose();
    }
  }, [email, handleClose]);

  return email ? (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        className={classes.menuButton}
        disabled={isLoadingDisconnect}
        size="large"
      >
        <ProviderIcon provider={provider} className={classes.providerIcon} />
        {shrinkAddress(email)}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        <MenuItem
          disabled={isLoadingDisconnect}
          onClick={handleDisconnectButtonClick}
        >
          {t('header.logout')}
        </MenuItem>
      </Menu>
    </>
  ) : (
    <>
      <SignInDialog open={isOpen} onClose={handleCloseDialog} />

      <LoadableButton
        variant="text"
        color="primary"
        className={classes.button}
        disableElevation={false}
        onClick={handleOpenDialog}
        disabled={isLoadingDisconnect}
        loading={isLoadingDisconnect}
      >
        {t('header.login-button')}
      </LoadableButton>
    </>
  );
};
