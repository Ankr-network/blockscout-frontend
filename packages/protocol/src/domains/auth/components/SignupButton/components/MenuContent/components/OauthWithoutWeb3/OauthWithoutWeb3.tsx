import { OauthLoginProvider } from 'multirpc-sdk';

import { OauthIcon } from '../../../OauthIcon';
import { GoogleMenuItemButton } from '../../../MenuItemButton/components/GoogleMenuItemButton';
import { WalletMenuItemButton } from '../../../MenuItemButton/components/WalletMenuItemButton';
import { OauthSignoutButton } from '../../../SignoutButton/components/OauthSignoutButton';
import { UserInfoMenuItem } from '../../../UserInfoMenuItem';
import { GithubMenuItemButton } from '../../../MenuItemButton/components/GithubMenuItemButton';

interface OauthWithoutWeb3Props {
  isLoading: boolean;
  onConnect: () => void;
  address: string;
  email?: string;
  loginName?: string;
  isUserEthAddressType: boolean;
  oauthProviders?: OauthLoginProvider[];
}

export const OauthWithoutWeb3 = ({
  isLoading,
  email,
  address,
  onConnect,
  isUserEthAddressType,
  loginName,
  oauthProviders = [],
}: OauthWithoutWeb3Props) => {
  const providers = [...oauthProviders];
  const mainProvider = providers.shift();
  const isGoogle = mainProvider === OauthLoginProvider.Google;

  return (
    <>
      <UserInfoMenuItem
        isLoading={isLoading}
        providers={providers}
        icon={<OauthIcon oauthProvider={mainProvider} />}
        title={isGoogle ? email : loginName}
        subtitle={isGoogle ? loginName : email}
        signoutButton={<OauthSignoutButton />}
      />
      {isUserEthAddressType && (
        <WalletMenuItemButton
          isLoading={isLoading}
          onConnect={onConnect}
          address={address}
        />
      )}
      {!email && <GoogleMenuItemButton isLoading={isLoading} />}
      {!loginName && <GithubMenuItemButton isLoading={isLoading} />}
    </>
  );
};
