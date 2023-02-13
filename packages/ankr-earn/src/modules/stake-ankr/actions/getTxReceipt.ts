import { t } from '@ankr.com/common';
import { TransactionReceipt } from 'web3-core';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetTxReceiptProps {
  txHash: string;
}

export const { useGetANKRTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getANKRTxReceipt: build.query<
      TransactionReceipt | null,
      IGetTxReceiptProps
    >({
      queryFn: queryFnNotifyWrapper<
        IGetTxReceiptProps,
        never,
        TransactionReceipt | null
      >(async ({ txHash }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return {
          data: await sdk.fetchTxReceipt(txHash),
        };
      }, getOnErrorWithCustomText(t('stake-ankr.errors.txn-receipt'))),
    }),
  }),
});
