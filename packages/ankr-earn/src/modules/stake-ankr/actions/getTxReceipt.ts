import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export interface IGetTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
  provider: string;
}

interface IGetTxReceiptProps {
  txHash: string;
}

export const { useGetTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTxReceipt: build.query<TransactionReceipt | null, IGetTxReceiptProps>({
      queryFn: async ({ txHash }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return {
          data: await sdk.fetchTxReceipt(txHash),
        };
      },
    }),
  }),
});
