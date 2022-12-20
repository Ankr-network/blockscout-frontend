import { EthAddressType, IEthUserAddress } from 'multirpc-sdk';

export interface SecreteCodeAndState {
  code: string | null;
  state: string | null;
}

export interface SecretCodeData {
  secret_code: string;
  state: string;
}

export const getSecreteCodeAndState = (): SecreteCodeAndState => {
  const redirectedURL = new URL(window.location.href);

  return {
    code: redirectedURL.searchParams.get('code'),
    state: redirectedURL.searchParams.get('state'),
  };
};

export const buildSecretCodeData = (
  secretCode: string,
  state = '',
): SecretCodeData => ({
  secret_code: secretCode,
  state,
});

export const getEthUserAddress = (addresses: IEthUserAddress[]) => {
  const userAddress = addresses.find(item => item.type === EthAddressType.User);

  if (userAddress) return userAddress;

  return addresses.find(item => item.type === EthAddressType.Generated);
};
