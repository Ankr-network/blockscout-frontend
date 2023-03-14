import { t } from '@ankr.com/common';
import retry from 'async-retry';
import { TransactionReceipt } from 'web3-eth';

import { IFetchTxData } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { getAvalancheSDK } from '../utils/getAvalancheSDK';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetAVAXTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXTxData: build.query<IFetchTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, IFetchTxData>(
        async ({ txHash }) => {
          const sdk = await getAvalancheSDK();

          return {
            data: await retry(() => sdk.fetchTxData(txHash), {
              retries: RETRIES_TO_GET_TX_DATA,
            }),
          };
        },
        error => getExtendedErrorText(error, t('stake-avax.errors.tx-data')),
      ),
    }),
  }),
});

export const { useGetAVAXTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXTxReceipt: build.query<TransactionReceipt | null, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        TransactionReceipt | null
      >(
        async ({ txHash }) => {
          const sdk = await getAvalancheSDK();

          return {
            data: await sdk.fetchTxReceipt(txHash),
          };
        },
        error => getExtendedErrorText(error, t('stake-avax.errors.tx-receipt')),
      ),
    }),
  }),
});
