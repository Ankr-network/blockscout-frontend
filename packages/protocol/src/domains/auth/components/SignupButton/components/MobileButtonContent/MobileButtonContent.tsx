import { WalletIcon } from '@ankr.com/ui';
import { OauthLoginProvider } from 'multirpc-sdk';

import { useMobileButtonContentStyles } from './useMobileButtonContentStyles';
import { OauthIcon } from '../OauthIcon';

interface MobileButtonContentProps {
  web3WithoutOauth: boolean;
  oauthWithoutWeb3: boolean;
  web3WithOauth: boolean;
  walletIcon?: string;
  oauthProvider?: OauthLoginProvider;
}

export const MobileButtonContent = ({
  web3WithoutOauth,
  oauthWithoutWeb3,
  web3WithOauth,
  walletIcon,
  oauthProvider,
}: MobileButtonContentProps) => {
  const { classes } = useMobileButtonContentStyles();

  if (web3WithoutOauth) {
    return (
      <WalletIcon className={classes.walletIconMobile} icon={walletIcon} />
    );
  }

  if (web3WithOauth) {
    return (
      <>
        <WalletIcon className={classes.walletIconMobile} icon={walletIcon} />
        <OauthIcon
          oauthProvider={oauthProvider}
          className={classes.walletIconSmall}
        />
      </>
    );
  }

  if (oauthWithoutWeb3) {
    return (
      <OauthIcon
        oauthProvider={oauthProvider}
        className={classes.walletIconMobile}
      />
    );
  }

  return null;
};
