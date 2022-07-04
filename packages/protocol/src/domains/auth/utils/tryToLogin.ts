import { MultiRpcSdk } from 'multirpc-sdk';

const PROVIDER_ERROR_USER_DENIED = 4001;

export const tryToLogin = async (
  service: MultiRpcSdk,
  address: string,
  key: string,
) => {
  try {
    const data = await service.loginAsUser(address, key);

    return data;
  } catch (error: any) {
    if (error.code === PROVIDER_ERROR_USER_DENIED) {
      throw error;
    }

    return undefined;
  }
};
