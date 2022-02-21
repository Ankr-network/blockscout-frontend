import MultiRpcSdk from '@ankr.com/multirpc';

const PROVIDER_ERROR_USER_DENIED = 4001;

export async function tryToLogin(
  service: MultiRpcSdk,
  address: string,
  key: string,
) {
  try {
    return service.loginAsUser(address, key);
  } catch (error: any) {
    if (error.code === PROVIDER_ERROR_USER_DENIED) {
      throw error;
    }

    return undefined;
  }
}
