import { OauthLoginProvider } from 'multirpc-sdk';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { Web3WithoutOauth } from './components/Web3WithoutOauth';
import { Web3WithOauth } from './components/Web3WithOauth';
import { OauthWithoutWeb3 } from './components/OauthWithoutWeb3';

interface MenuContentProps {
  oauthWithoutWeb3: boolean;
  web3WithoutOauth: boolean;
  web3WithOauth: boolean;
  email: string;
  address: string;
  onConnect: () => void;
  walletIcon?: string;
  isLoading: boolean;
  oauthProviders?: OauthLoginProvider[];
  loginName?: string;
}

export const MenuContent = ({
  oauthWithoutWeb3,
  web3WithoutOauth,
  web3WithOauth,
  email,
  address,
  onConnect,
  walletIcon,
  isLoading,
  oauthProviders = [],
  loginName,
}: MenuContentProps) => {
  const { isUserEthAddressType } = useAuth();

  if (oauthWithoutWeb3) {
    return (
      <OauthWithoutWeb3
        isLoading={isLoading}
        address={address}
        email={email}
        loginName={loginName}
        isUserEthAddressType={isUserEthAddressType}
        onConnect={onConnect}
        oauthProviders={oauthProviders}
      />
    );
  }

  if (web3WithoutOauth) {
    return (
      <Web3WithoutOauth
        isLoading={isLoading}
        walletIcon={walletIcon}
        address={address}
        email={email}
        loginName={loginName}
      />
    );
  }

  if (web3WithOauth) {
    return (
      <Web3WithOauth
        isLoading={isLoading}
        walletIcon={walletIcon}
        address={address}
        email={email}
        loginName={loginName}
        oauthProviders={oauthProviders}
      />
    );
  }

  return null;
};
