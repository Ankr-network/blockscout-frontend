import { useCallback, useMemo, useState } from 'react';
import { WalletIcon } from '@ankr.com/ui';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useMenu } from 'modules/common/hooks/useMenu';
import { GOOGLE_PROVIDER } from 'domains/auth/store/authSlice';

import { UnconnectedButton } from '../ConnectButton/UnconnectedButton';
import { shrinkUserData } from './SignupButtonUtils';
import { SignupMenu } from './components/SignupMenu';
import { SignupDialog } from '../ConnectButton/UnconnectedButton/SignupDialog';
import { MenuButton } from './components/MenuButton';
import { MobileButtonContent } from './components/MobileButtonContent';
import { useMobileButtonContentStyles } from './components/MobileButtonContent/useMobileButtonContentStyles';
import { MenuContent } from './components/MenuContent';
import { OauthIcon } from './components/OauthIcon';

interface SignupButtonProps {
  isDefaultType: boolean;
  isSidebarType: boolean;
  isMobileType: boolean;
}

export const SignupButton = ({
  isDefaultType,
  isSidebarType,
  isMobileType,
}: SignupButtonProps) => {
  const {
    hasOauthLogin,
    hasWeb3Connection,
    address,
    email,
    loading,
    walletMeta,
    oauthProviders,
    loginName,
  } = useAuth();

  const { open, anchorEl, handleOpen, handleClose } = useMenu();

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleCloseSignupDialogClose = useCallback(() => {
    setIsOpened(false);
    handleClose();
  }, [setIsOpened, handleClose]);

  const {
    address: shrinkedAddress,
    email: shrinkedEmail,
    loginName: shrinkedLoginName,
  } = useMemo(
    () => shrinkUserData(address, email, loginName),
    [address, email, loginName],
  );

  const withoutWeb3WithoutOauth = !hasOauthLogin && !hasWeb3Connection;
  const oauthWithoutWeb3 = Boolean(hasOauthLogin && !hasWeb3Connection);
  const web3WithOauth = Boolean(hasWeb3Connection && hasOauthLogin);
  const web3WithoutOauth = hasWeb3Connection && !hasOauthLogin;

  const handleConnect = useCallback(() => {
    setIsOpened(true);
    handleClose();
  }, [setIsOpened, handleClose]);

  const { classes } = useMobileButtonContentStyles();

  if (withoutWeb3WithoutOauth) {
    return <UnconnectedButton variant="contained" onSuccess={handleClose} />;
  }

  const walletIcon = walletMeta?.icon;

  const mainOauthProvider = oauthProviders?.[0];
  const isGoogle = mainOauthProvider === GOOGLE_PROVIDER;

  return (
    <>
      <MenuButton
        isLoading={loading}
        onOpen={handleOpen}
        isSidebarType={isSidebarType}
        isMobileType={isMobileType}
        isDefaultType={isDefaultType}
        desktopContent={
          <>
            {oauthWithoutWeb3 ? (
              <>
                <OauthIcon
                  oauthProvider={mainOauthProvider}
                  className={classes.oauthIcon}
                />
                {!isSidebarType && (
                  <span className={classes.email}>
                    {isGoogle ? shrinkedEmail : shrinkedLoginName}
                  </span>
                )}
              </>
            ) : (
              <>
                <WalletIcon icon={walletIcon} className={classes.walletIcon} />
                {!isSidebarType && shrinkedAddress}
              </>
            )}
          </>
        }
        mobileContent={
          <MobileButtonContent
            oauthWithoutWeb3={oauthWithoutWeb3}
            web3WithoutOauth={web3WithoutOauth}
            web3WithOauth={web3WithOauth}
            walletIcon={walletIcon}
            oauthProvider={mainOauthProvider}
          />
        }
      />

      <SignupMenu isOpened={open} anchorEl={anchorEl} handleClose={handleClose}>
        <MenuContent
          oauthWithoutWeb3={oauthWithoutWeb3}
          web3WithoutOauth={web3WithoutOauth}
          web3WithOauth={web3WithOauth}
          email={shrinkedEmail}
          loginName={shrinkedLoginName}
          address={shrinkedAddress}
          onConnect={handleConnect}
          walletIcon={walletIcon}
          isLoading={loading}
          oauthProviders={oauthProviders}
        />
      </SignupMenu>

      <SignupDialog
        isOpen={isOpened}
        onClose={handleCloseSignupDialogClose}
        hasOauthLogin={hasOauthLogin}
      />
    </>
  );
};
