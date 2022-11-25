import retry from 'async-retry';
import { TransactionReceipt } from 'web3-eth';

import { IFetchTxData } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetSUITxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSUITxData: build.query<IFetchTxData | null, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        IFetchTxData | null
      >(async () => {
        return {
          data: await retry(() => null, {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      }),
    }),
  }),
});

export const { useGetSUITxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSUITxReceipt: build.query<TransactionReceipt | null, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        TransactionReceipt | null
      >(async () => {
        return {
          data: null,
        };
      }),
    }),
  }),
});
