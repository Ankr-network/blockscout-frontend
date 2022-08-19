import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticEthSDK, MaticPolygonSDK } from '@ankr.com/staking-sdk';

interface IGetNetworkChooserData {
  maticEthBalance: BigNumber;
  maticPolygonBalance: BigNumber;
}

export const getNetworkChooserData = createSmartAction<
  RequestAction<IGetNetworkChooserData, IGetNetworkChooserData>
>('matic/common/getNetworkChooserData', () => ({
  request: {
    promise: (async (): Promise<IGetNetworkChooserData> => {
      const [ethSDK, polygonSDK] = await Promise.all([
        MaticEthSDK.getInstance(),
        MaticPolygonSDK.getInstance(),
      ]);

      const [maticEthBalance, maticPolygonBalance] = await Promise.all([
        ethSDK.getMaticBalance(),
        polygonSDK.getMaticBalance(),
      ]);

      return {
        maticEthBalance,
        maticPolygonBalance,
      };
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
  },
}));
