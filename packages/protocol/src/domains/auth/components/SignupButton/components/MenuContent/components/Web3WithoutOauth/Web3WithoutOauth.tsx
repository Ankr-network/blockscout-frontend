import { WalletIcon } from '@ankr.com/ui';

import { GoogleMenuItemButton } from '../../../MenuItemButton/components/GoogleMenuItemButton';
import { GithubMenuItemButton } from '../../../MenuItemButton/components/GithubMenuItemButton';
import { Web3SignoutButton } from '../../../SignoutButton/components/Web3SignoutButton';
import { UserInfoMenuItem } from '../../../UserInfoMenuItem';

interface Web3WithoutOauthProps {
  isLoading: boolean;
  walletIcon?: string;

  address: string;
  email?: string;
  loginName?: string;
}

export const Web3WithoutOauth = ({
  isLoading,
  walletIcon,
  address,
  email,
  loginName,
}: Web3WithoutOauthProps) => {
  return (
    <>
      <UserInfoMenuItem
        isLoading={isLoading}
        icon={<WalletIcon icon={walletIcon} />}
        title={address}
        subtitle={loginName}
        signoutButton={<Web3SignoutButton />}
      />
      {!email && <GoogleMenuItemButton isLoading={isLoading} />}
      {!loginName && <GithubMenuItemButton isLoading={isLoading} />}
    </>
  );
};
