import { OauthLoginProvider } from 'multirpc-sdk';

import { useFetchOauthLoginParams } from 'domains/auth/hooks/useFetchOauthLoginParams';

import { LoginProvider } from '../LoginProvider';

interface IGithubProviderProps {
  isConnected: boolean;
  shouldHideDisconnectButton?: boolean;
  shouldDisableConnectButton?: boolean;
  address?: string;
  nickName?: string;
}

export const GithubProvider = ({
  address,
  isConnected,
  nickName,
  shouldDisableConnectButton,
  shouldHideDisconnectButton,
}: IGithubProviderProps) => {
  const onGithubLogin = useFetchOauthLoginParams();

  return (
    <LoginProvider
      provider={OauthLoginProvider.Github}
      isConnected={isConnected}
      shouldHideDisconnectButton={shouldHideDisconnectButton}
      shouldDisableConnectButton={shouldDisableConnectButton}
      address={address}
      nickName={nickName}
      handleConnectClick={onGithubLogin}
    />
  );
};
