import { Button, Fade, Menu, MenuItem } from '@material-ui/core';
import { useCallback } from 'react';

import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useStyles } from '../useStyles';
import { WalletIcon } from 'ui';

interface ConnectedButtonProps {
  isMobile: boolean;
}

export const ConnectedButton = ({ isMobile }: ConnectedButtonProps) => {
  const classes = useStyles({ isMobile });
  const { handleDisconnect, address, loading, walletMeta } = useAuth();
  const { open, anchorEl, handleOpen, handleClose } = useMenu();

  const handleDisconnectButtonClick = useCallback(() => {
    handleClose();
    handleDisconnect();
  }, [handleClose, handleDisconnect]);

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
  );
};
