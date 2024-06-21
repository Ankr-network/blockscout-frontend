import { useCallback } from 'react';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { t } from '@ankr.com/common';
import { WalletIcon } from '@ankr.com/ui';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useMenu } from 'modules/common/hooks/useMenu';

import { useStyles } from '../useStyles';

interface ConnectedButtonProps {
  isMobile: boolean;
}

export const ConnectedButton = ({ isMobile }: ConnectedButtonProps) => {
  const { classes } = useStyles(isMobile);
  const { address, handleDisconnect, loading, walletMeta } = useAuth();
  const { anchorEl, handleClose, handleOpen, open } = useMenu();

  const handleDisconnectButtonClick = useCallback(() => {
    handleClose();
    handleDisconnect();
  }, [handleClose, handleDisconnect]);
  const onClose = useCallback(() => handleClose(), [handleClose]);

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        className={classes.menuButton}
        disabled={loading}
      >
        {!isMobile && (
          <WalletIcon icon={walletMeta?.icon} className={classes.walletIcon} />
        )}
        {shrinkAddress(address)}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
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
  );
};
