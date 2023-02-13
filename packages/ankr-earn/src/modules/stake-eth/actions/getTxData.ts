import { t } from '@ankr.com/common';
import retry from 'async-retry';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { getEthereumSDK } from '../utils/getEthereumSDK';

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
        async ({ txHash, shouldDecodeAmount }) => {
          const sdk = await getEthereumSDK();

          const data = await retry(
            () => sdk.fetchTxData(txHash, shouldDecodeAmount),
            { retries: RETRIES_TO_GET_TX_DATA },
          );

          return { data };
        },
        getOnErrorWithCustomText(t('stake-ethereum.errors.tx-data')),
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
        const sdk = await getEthereumSDK();

        return {
          data: await retry(() => sdk.fetchTxReceipt(txHash), {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      }, getOnErrorWithCustomText(t('stake-ethereum.errors.tx-receipt'))),
    }),
  }),
});
