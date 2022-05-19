import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { AvailableSwitcherToken, AvailableSwitchNetwork } from '../const';

export interface IGetSwitcherDataArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
}

export interface IGetSwitcherData {
  abBalance: BigNumber;
  acBalance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
}

export const getSwitcherData = createAction<
  RequestAction<IGetSwitcherData, IGetSwitcherData>
>('switcher/getSwitcherData', ({ chainId, token }: IGetSwitcherDataArgs) => ({
  request: {
    promise: async (): Promise<IGetSwitcherData | undefined> => {
      const sdk = await SwitcherSDK.getInstance();

      return sdk.getCommonData({ chainId, token });
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: false,
    onRequest: withStore,
  },
}));
