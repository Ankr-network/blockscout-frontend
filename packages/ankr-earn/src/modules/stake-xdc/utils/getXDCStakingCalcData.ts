import { RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider, XDC } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { XDC_PROVIDER_BY_ENV, ZERO } from 'modules/common/const';

interface IData {
  balance: BigNumber;
  staked: BigNumber;
}

const { getAXDCCBalance, getAXDCCRatio, getXDCBalance } = XDC;

export const getXDCStakingCalcData = async (
  store: RequestsStore,
): Promise<IData> => {
  const defaultState: IData = {
    balance: ZERO,
    staked: ZERO,
  };

  const providerManager = getProviderManager();

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

  const [aXDCcBalance, aXDCcRatio, xdcBalance] = await Promise.all([
    getAXDCCBalance({
      address,
      provider,
    }),
    getAXDCCRatio({
      provider,
    }),
    getXDCBalance({
      address,
      provider,
    }),
  ]);

  return {
    balance: xdcBalance,
    staked: aXDCcBalance.dividedBy(aXDCcRatio),
  };
};
