import { RequestsStore } from '@redux-requests/core';

import {
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { XDC_PROVIDER_BY_ENV } from 'modules/common/const';

type TGetXDCReadInstanceData = IGetXDCReadInstanceData | null;

interface IGetXDCReadInstanceData {
  XDC: typeof XDC;
  address: string;
  provider: Web3KeyReadProvider;
}

export const getXDCReadInstance = async (
  store: RequestsStore,
): Promise<TGetXDCReadInstanceData> => {
  const providerManager = ProviderManagerSingleton.getInstance();

  const { address } = selectEthProviderData(store.getState());

  if (!address) {
    return null;
  }

  const provider = await providerManager.getETHReadProvider(
    XDC_PROVIDER_BY_ENV,
  );

  if (!(provider instanceof Web3KeyReadProvider)) {
    return null;
  }

  return {
    XDC,
    address,
    provider,
  };
};
