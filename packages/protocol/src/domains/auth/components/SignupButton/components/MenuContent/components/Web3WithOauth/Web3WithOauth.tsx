import { WalletIcon } from '@ankr.com/ui';
import { OauthLoginProvider } from 'multirpc-sdk';

import { GoogleMenuItemButton } from '../../../MenuItemButton/components/GoogleMenuItemButton';
import { GithubMenuItemButton } from '../../../MenuItemButton/components/GithubMenuItemButton';
import { OauthSignoutButton } from '../../../SignoutButton/components/OauthSignoutButton';
import { UserInfoMenuItem } from '../../../UserInfoMenuItem';

interface Web3WithOauthProps {
  isLoading: boolean;
  walletIcon?: string;
  address: string;
  email?: string;
  oauthProviders: OauthLoginProvider[];
  loginName?: string;
}

export const Web3WithOauth = ({
  isLoading,
  email,
  address,
  walletIcon,
  oauthProviders,
  loginName,
}: Web3WithOauthProps) => {
  const isGoogle = oauthProviders[0] === OauthLoginProvider.Google;

  return (
    <>
      <UserInfoMenuItem
        isLoading={isLoading}
        providers={oauthProviders}
        icon={<WalletIcon icon={walletIcon} />}
        title={address}
        subtitle={isGoogle ? email : loginName}
        signoutButton={<OauthSignoutButton />}
      />
      {!email && <GoogleMenuItemButton isLoading={isLoading} />}
      {!loginName && <GithubMenuItemButton isLoading={isLoading} />}
    </>
  );
};
