import retry from 'async-retry';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

export interface IGetSwitcherData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

interface IGetTxDataArgs {
  txHash: string;
  shouldDecodeAmount?: boolean;
}

export const { useGetETHTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHTxData: build.query<IGetSwitcherData, IGetTxDataArgs>({
      queryFn: queryFnNotifyWrapper<IGetTxDataArgs, never, IGetSwitcherData>(
        async ({ txHash }) => {
          const sdk = await EthereumSDK.getInstance();

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

export const { useGetETHTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHTxReceipt: build.query<TransactionReceipt | null, IGetTxDataArgs>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataArgs,
        never,
        TransactionReceipt | null
      >(async ({ txHash }) => {
        const sdk = await EthereumSDK.getInstance();

        return {
          data: await retry(() => sdk.fetchTxReceipt(txHash), {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      }),
    }),
  }),
});
