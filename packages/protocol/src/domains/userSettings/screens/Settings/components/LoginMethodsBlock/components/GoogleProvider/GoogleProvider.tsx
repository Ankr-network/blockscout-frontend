import { OauthLoginProvider } from 'multirpc-sdk';

import { useFetchGoogleLoginParams } from 'domains/auth/hooks/useFetchGoogleLoginParams';

import { LoginProvider } from '../LoginProvider';

interface IGoogleProviderProps {
  isConnected: boolean;
  shouldHideDisconnectButton?: boolean;
  shouldDisableConnectButton?: boolean;
  address?: string;
}

export const GoogleProvider = ({
  isConnected,
  shouldHideDisconnectButton,
  shouldDisableConnectButton,
  address,
}: IGoogleProviderProps) => {
  const onGoogleLogin = useFetchGoogleLoginParams();

  return (
    <LoginProvider
      provider={OauthLoginProvider.Google}
      isConnected={isConnected}
      shouldHideDisconnectButton={shouldHideDisconnectButton}
      shouldDisableConnectButton={shouldDisableConnectButton}
      address={address}
      handleConnectClick={onGoogleLogin}
    />
  );
};
