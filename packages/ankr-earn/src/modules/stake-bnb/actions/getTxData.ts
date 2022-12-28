import retry from 'async-retry';

import { IFetchTxData, IGetTxReceipt } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { isMainnet, RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { getBinanceSDK } from '../utils/getBinanceSDK';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetBNBTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBTxData: build.query<IFetchTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, IFetchTxData>(
        async ({ txHash }) => {
          const sdk = await getBinanceSDK();

          return {
            data: await retry(() => sdk.fetchTxData(txHash), {
              retries: RETRIES_TO_GET_TX_DATA,
            }),
          };
        },
      ),
    }),
  }),
});

export const { useGetBNBUnstakeTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBUnstakeTxData: build.query<IFetchTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, IFetchTxData>(
        async ({ txHash }) => {
          const sdk = await getBinanceSDK();

          return {
            data: await retry(() => sdk.fetchUnstakeTxData(txHash), {
              retries: RETRIES_TO_GET_TX_DATA,
            }),
          };
        },
      ),
    }),
  }),
});

export const { useGetBNBTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBTxReceipt: build.query<IGetTxReceipt | null, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        IGetTxReceipt | null
      >(async ({ txHash }) => {
        const sdk = await getBinanceSDK();
        const data = isMainnet
          ? await sdk.fetchTxReceipt(txHash)
          : await sdk.fetchTxReceiptOld(txHash);

        return { data };
      }),
    }),
  }),
});
