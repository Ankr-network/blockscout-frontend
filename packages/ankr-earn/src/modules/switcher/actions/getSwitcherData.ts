import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { AvailableSwitchNetwork } from '../const';

export interface IGetSwitcherDataArgs {
  chainId: AvailableSwitchNetwork;
}

export interface IGetSwitcherData {
  abBalance: BigNumber;
  acBalance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
}

export const getSwitcherData = createAction<
  RequestAction<IGetSwitcherData, IGetSwitcherData>
>('switcher/getSwitcherData', ({ chainId }: IGetSwitcherDataArgs) => ({
  request: {
    promise: async (): Promise<IGetSwitcherData | undefined> => {
      const sdk = await SwitcherSDK.getInstance();

      return sdk.getCommonData({ chainId });
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: false,
    onRequest: withStore,
  },
}));
