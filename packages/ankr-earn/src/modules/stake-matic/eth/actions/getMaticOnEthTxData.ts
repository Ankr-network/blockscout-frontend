import { t } from '@ankr.com/common';
import retry from 'async-retry';
import { TransactionReceipt } from 'web3-eth';

import { IFetchTxData } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetMaticOnEthTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthTxData: build.query<IFetchTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, IFetchTxData>(
        async ({ txHash }) => {
          const sdk = await getPolygonOnEthereumSDK();

          return {
            data: await retry(() => sdk.fetchTxData(txHash), {
              retries: RETRIES_TO_GET_TX_DATA,
            }),
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-matic-common.errors.tx-data')),
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
      >(
        async ({ txHash }) => {
          const sdk = await getPolygonOnEthereumSDK();

          return {
            data: await retry(() => sdk.fetchTxReceipt(txHash), {
              retries: RETRIES_TO_GET_TX_DATA,
            }),
          };
        },
        error =>
          getExtendedErrorText(
            error,
            t('stake-matic-common.errors.tx-receipt'),
          ),
      ),
    }),
  }),
});
