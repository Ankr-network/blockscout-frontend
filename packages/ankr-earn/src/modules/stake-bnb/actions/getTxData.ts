import { t } from '@ankr.com/common';
import retry from 'async-retry';

import { IFetchTxData, IGetTxReceipt } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

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
        error => getExtendedErrorText(error, t('stake-bnb.errors.tx-data')),
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
        error =>
          getExtendedErrorText(error, t('stake-bnb.errors.unstake-tx-data')),
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
      >(
        async ({ txHash }) => {
          const sdk = await getBinanceSDK();
          const data = await sdk.fetchTxReceipt(txHash);

          return { data };
        },
        error => getExtendedErrorText(error, t('stake-bnb.errors.tx-receipt')),
      ),
    }),
  }),
});
