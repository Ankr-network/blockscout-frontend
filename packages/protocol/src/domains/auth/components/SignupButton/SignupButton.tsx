import { Box, Button, MenuItem, Typography } from '@mui/material';
import { Google, WalletIcon, Logout } from '@ankr.com/ui';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { UnconnectedButton } from '../ConnectButton/UnconnectedButton';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useSignupButtonStyles } from './useSignupButtonStyles';
import { shrinkEmailAddress } from './SignupButtonUtils';
import { useMenu } from 'modules/common/hooks/useMenu';
import { SignupMenu } from './SignupMenu';
import { t } from '@ankr.com/common';
import { SignupDialog } from '../ConnectButton/UnconnectedButton/SignupDialog';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

interface SignupButtonProps {
  isMobile?: boolean;
}

export const SignupButton = ({ isMobile }: SignupButtonProps) => {
  const {
    hasOauthLogin,
    hasWeb3Connection,
    address,
    email,
    loading,
    walletMeta,
    handleSignout,
    handleDisconnect,
    isUserEthAddressType,
  } = useAuth();
  const history = useHistory();

  const { classes } = useSignupButtonStyles(!!isMobile);
  const { open, anchorEl, handleOpen, handleClose } = useMenu();

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleCloseSignupDialogClose = () => {
    setIsOpened(false);
    handleClose();
  };

  const handleGoogleLogin = useCallback(() => {
    history.push(UserSettingsRoutesConfig.settings.generatePath());
  }, [history]);

  if (!hasOauthLogin && !hasWeb3Connection) {
    return <UnconnectedButton variant="contained" onSuccess={handleClose} />;
  }

  let desktopButtonContent = (
    <>
      {!isMobile && (
        <WalletIcon icon={walletMeta?.icon} className={classes.walletIcon} />
      )}
      {shrinkAddress(address)}
    </>
  );
  let mobileButtonContent = (
    <WalletIcon
      className={classes.mobileButtonContent}
      icon={walletMeta?.icon}
    />
  );

  let top;
  let bottom;

  if (hasOauthLogin && !hasWeb3Connection) {
    desktopButtonContent = (
      <>
        {!isMobile && <Google className={classes.walletIcon} />}
        {shrinkEmailAddress(email)}
      </>
    );

    mobileButtonContent = <Google className={classes.mobileButtonContent} />;

    top = (
      <MenuItem disabled={loading} className={classes.top}>
        <Box className={classes.email}>
          <Google className={classes.walletIcon} />
          <Typography noWrap className={classes.emailText} variant="body2">
            {email}
          </Typography>
        </Box>
        <Button
          endIcon={<Logout />}
          className={classes.signoutButton}
          variant="text"
          size="large"
          onClick={handleSignout}
        >
          {t('header.sign-out')}
        </Button>
      </MenuItem>
    );

    bottom = isUserEthAddressType ? (
      <MenuItem disabled={loading} className={classes.connectWallet}>
        <Typography
          noWrap
          className={classes.emailText}
          variant="body2"
          color="textSecondary"
        >
          {shrinkAddress(address)}
        </Typography>
        <Button
          className={classes.connectWalletButton}
          variant="text"
          size="large"
          onClick={() => {
            setIsOpened(true);
            handleClose();
          }}
        >
          {t('header.connect-wallet')}
        </Button>
      </MenuItem>
    ) : null;
  }

  if (!hasOauthLogin && hasWeb3Connection) {
    top = (
      <MenuItem disabled={loading} className={classes.top}>
        <Box className={classes.email}>
          <Box className={classes.userLogo}>
            <WalletIcon
              icon={walletMeta?.icon}
              className={classes.walletIconBig}
            />
          </Box>

          <Typography noWrap className={classes.emailText} variant="body2">
            {shrinkAddress(address)}
          </Typography>
        </Box>
        <Button
          endIcon={<Logout />}
          className={classes.signoutButton}
          variant="text"
          size="large"
          onClick={handleDisconnect}
        >
          {t('header.disconnect')}
        </Button>
      </MenuItem>
    );

    bottom = !email ? (
      <MenuItem disabled={loading} className={classes.bottom}>
        <Button
          startIcon={<Google className={classes.walletIcon} />}
          className={classes.connectWalletButton}
          variant="text"
          size="large"
          fullWidth
          onClick={handleGoogleLogin}
        >
          {t('header.add-google')}
        </Button>
      </MenuItem>
    ) : null;
  }

  if (hasOauthLogin && hasWeb3Connection) {
    mobileButtonContent = (
      <>
        <WalletIcon
          className={classes.mobileButtonContent}
          icon={walletMeta?.icon}
        />
        <Google className={classes.walletIconSmall} />
      </>
    );

    top = (
      <MenuItem disabled={loading} className={classes.top}>
        <Box className={classes.email}>
          <Box className={classes.userLogo}>
            <WalletIcon
              icon={walletMeta?.icon}
              className={classes.walletIconBig}
            />
            <Google className={classes.walletIconSmall} />
          </Box>
          <Box className={classes.userData}>
            <Typography
              component="p"
              noWrap
              className={classes.emailText}
              variant="body2"
            >
              {email}
            </Typography>

            <Typography
              noWrap
              variant="subtitle1"
              color="textSecondary"
              className={classes.subtitle}
            >
              {shrinkAddress(address)}
            </Typography>
          </Box>
        </Box>
        <Button
          endIcon={<Logout />}
          className={classes.signoutButton}
          variant="text"
          size="large"
          onClick={handleSignout}
        >
          {t('header.sign-out')}
        </Button>
      </MenuItem>
    );
  }

  return (
    <>
      <Button
        variant="text"
        className={classes.menuButton}
        disabled={loading}
        onClick={handleOpen}
      >
        <div className={classes.desktopButtonContent}>
          {desktopButtonContent}
        </div>
        {mobileButtonContent}
      </Button>
      <SignupMenu
        isOpened={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        className={classes.menu}
      >
        {top}
        {bottom}
      </SignupMenu>

      <SignupDialog
        isOpen={isOpened}
        onClose={handleCloseSignupDialogClose}
        hasOauthLogin={hasOauthLogin}
      />
    </>
  );
};
