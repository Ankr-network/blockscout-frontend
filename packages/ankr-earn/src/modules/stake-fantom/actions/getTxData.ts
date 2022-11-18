import retry from 'async-retry';
import { TransactionReceipt } from 'web3-eth';

import { FantomSDK, IFetchTxData } from '@ankr.com/staking-sdk';

import { web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetFTMTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMTxData: build.query<IFetchTxData, IGetTxDataProps>({
      queryFn: async ({ txHash }) => {
        const sdk = await FantomSDK.getInstance();

        return {
          data: await retry(() => sdk.fetchTxData(txHash), {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      },
    }),
  }),
});

export const { useGetFTMTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMTxReceipt: build.query<TransactionReceipt | null, IGetTxDataProps>({
      queryFn: async ({ txHash }) => {
        const sdk = await FantomSDK.getInstance();

        return {
          data: await sdk.fetchTxReceipt(txHash),
        };
      },
    }),
  }),
});
