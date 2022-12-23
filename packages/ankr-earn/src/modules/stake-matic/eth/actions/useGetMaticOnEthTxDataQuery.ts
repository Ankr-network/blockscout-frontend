import retry from 'async-retry';
import { TransactionReceipt } from 'web3-eth';

import { IFetchTxData, PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetMaticOnEthTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthTxData: build.query<IFetchTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, IFetchTxData>(
        async ({ txHash }) => {
          const sdk = await PolygonOnEthereumSDK.getInstance();

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

export const { useGetMaticOnEthTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthTxReceipt: build.query<
      TransactionReceipt | null,
      IGetTxDataProps
    >({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        TransactionReceipt | null
      >(async ({ txHash }) => {
        const sdk = await PolygonOnEthereumSDK.getInstance();

        return {
          data: await retry(() => sdk.fetchTxReceipt(txHash), {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      }),
    }),
  }),
});
