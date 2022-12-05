import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { MultiService } from 'modules/api/MultiService';
import {
  selectTransaction,
  setWithdrawTransaction,
} from 'domains/account/store/accountWithdrawSlice';
import { t } from 'modules/i18n/utils/intl';

const setTransaction = (
  store: RequestsStore,
  address: string,
  withdrawTransactionHash: string,
) => {
  if (withdrawTransactionHash) {
    store.dispatch(
      setWithdrawTransaction({
        address,
        withdrawTransactionHash,
      }),
    );
  }
};

export const withdraw = createSmartAction<
  RequestAction<string, IWeb3SendResult>
>('withdraw/withdraw', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<any> => {
          const service = await MultiService.getWeb3Service();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          const transaction = selectTransaction(store.getState(), address);

          const amount = transaction?.amount;

          if (!amount) {
            throw new Error(
              t('validation.min-greater', {
                value: 0,
              }),
            );
          }

          const witdrawResponse = await service
            .getContractService()
            .withdrawAnkr(new BigNumber(amount));

          setTransaction(store, address, witdrawResponse.transactionHash);

          return witdrawResponse;
        })(),
      };
    },
  },
}));
