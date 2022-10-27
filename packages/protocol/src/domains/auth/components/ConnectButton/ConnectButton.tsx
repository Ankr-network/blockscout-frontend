import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonTypeMap, Fade, Menu, MenuItem } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useStyles } from './useStyles';
import { LoadableButton } from 'uiKit/LoadableButton';
import { WalletIcon } from 'ui';
import { ConnectWalletsModal } from '../ConnectWalletsModal';

interface ConnectButtonProps {
  isMobile?: boolean;
  variant?: ButtonTypeMap['props']['variant'];
  buttonText?: string;
  onSuccess?: () => void;
}

export const ConnectButton = ({
  isMobile = false,
  variant = 'text',
  buttonText,
  onSuccess,
}: ConnectButtonProps) => {
  const classes = useStyles(isMobile);
  const { handleConnect, handleDisconnect, address, loading, walletMeta } =
    useAuth();
  const { open, anchorEl, handleOpen, handleClose } = useMenu();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleDisconnectButtonClick = useCallback(() => {
    handleClose();
    handleDisconnect();
  }, [handleClose, handleDisconnect]);

  useEffect(() => {
    if (!address) {
      handleClose();
    }
  }, [address, handleClose]);

  const onConnect = useCallback(
    async data => {
      const { error } = await handleConnect(data);

      if (typeof onSuccess === 'function' && !error) {
        onSuccess();
      }
    },
    [handleConnect, onSuccess],
  );

  return address ? (
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
  ) : (
    <>
      <LoadableButton
        variant={variant}
        color="primary"
        className={classes.button}
        disableElevation={false}
        onClick={() => setIsOpened(true)}
        disabled={loading}
        loading={loading}
      >
        {buttonText || t('header.wallet-button')}
      </LoadableButton>
      <ConnectWalletsModal
        isOpen={isOpened}
        onClose={() => setIsOpened(false)}
        onConnect={onConnect}
      />
    </>
  );
};
