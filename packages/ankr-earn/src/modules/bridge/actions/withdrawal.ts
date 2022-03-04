import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { BridgeSDK } from '../api/BridgeSDK';

export interface IWithdrawalRes {
  transactionHash: string;
}

export const withdrawal = createSmartAction<
  RequestAction<IWithdrawalRes, IWithdrawalRes>
>('bridge/withdrawal', (proof: string, receipt: string, signature: string) => ({
  request: {
    promise: (async (): Promise<IWithdrawalRes> => {
      const sdk = await BridgeSDK.getInstance();

      const withdrawResponse = await sdk.withdraw(proof, receipt, signature);
      const { receiptPromise, transactionHash } = withdrawResponse;
      await receiptPromise;

      return { transactionHash };
    })(),
  },
  meta: {
    asMutation: false,
    getData: data => data,
  },
}));
