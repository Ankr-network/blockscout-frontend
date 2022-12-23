import retry from 'async-retry';
import { TransactionReceipt } from 'web3-eth';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';
import { IFetchTxData } from 'modules/switcher/api/types';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetMaticOnPolygonTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnPolygonTxData: build.query<IFetchTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, IFetchTxData>(
        async ({ txHash }) => {
          const sdk = await PolygonOnPolygonSDK.getInstance();

          return {
            data: await retry(() => sdk.getTxData(txHash), {
              retries: RETRIES_TO_GET_TX_DATA,
            }),
          };
        },
      ),
    }),
  }),
});

export const { useGetMaticOnPolygonTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnPolygonTxReceipt: build.query<
      TransactionReceipt | null,
      IGetTxDataProps
    >({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        TransactionReceipt | null
      >(async ({ txHash }) => {
        const sdk = await PolygonOnPolygonSDK.getInstance();

        return {
          data: await retry(() => sdk.getTxReceipt(txHash), {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      }),
    }),
  }),
});
