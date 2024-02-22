import { OauthLoginProvider } from 'multirpc-sdk';

import { LoginProvider } from '../LoginProvider';

interface IWeb3ProviderProps {
  isConnected: boolean;
  address?: string;
}

export const Web3Provider = ({ isConnected, address }: IWeb3ProviderProps) => {
  if (!isConnected) return null;

  return (
    <LoginProvider
      address={address}
      isConnected={isConnected}
      provider={OauthLoginProvider.Email}
    />
  );
};
