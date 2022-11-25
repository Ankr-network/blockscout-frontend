import { EthAddressType, IEthUserAddress } from 'multirpc-sdk';

export const getSecreteCodeAndState = () => {
  const redirectedURL = new URL(window.location.href);

  return {
    code: redirectedURL.searchParams.get('code'),
    state: redirectedURL.searchParams.get('state'),
  };
};

export const buildSecretCodeData = (secretCode: string, state = '') => {
  return {
    secret_code: secretCode,
    state,
  };
};

export const getEthUserAddress = (addresses: IEthUserAddress[]) => {
  const userAddress = addresses.find(item => item.type === EthAddressType.User);

  if (userAddress) return userAddress;

  return addresses.find(item => item.type === EthAddressType.Generated);
};
