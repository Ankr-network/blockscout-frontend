import { RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';

import {
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { XDC_PROVIDER_BY_ENV, ZERO } from 'modules/common/const';

interface IData {
  balance: BigNumber;
  staked: BigNumber;
}

const { getAnkrXDCBalance, getAnkrXDCRatio, getXDCBalance } = XDC;

export const getXDCStakingCalcData = async (
  store: RequestsStore,
): Promise<IData> => {
  const defaultState: IData = {
    balance: ZERO,
    staked: ZERO,
  };

  const providerManager = ProviderManagerSingleton.getInstance();

  const { address } = selectEthProviderData(store.getState());

  if (!address) {
    return defaultState;
  }

  const provider = await providerManager.getETHReadProvider(
    XDC_PROVIDER_BY_ENV,
  );

  if (!(provider instanceof Web3KeyReadProvider)) {
    return defaultState;
  }

  const [ankrXDCBalance, ankrXDCRatio, xdcBalance] = await Promise.all([
    getAnkrXDCBalance({
      address,
      provider,
    }),
    getAnkrXDCRatio({
      provider,
    }),
    getXDCBalance({
      address,
      provider,
    }),
  ]);

  return {
    balance: xdcBalance,
    staked: ankrXDCBalance.dividedBy(ankrXDCRatio),
  };
};
