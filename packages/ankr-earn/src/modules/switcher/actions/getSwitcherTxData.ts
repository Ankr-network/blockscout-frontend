import { t } from '@ankr.com/common';
import retry from 'async-retry';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { IFetchTxData, IFetchTxReceiptData } from '../api/types';
import { AvailableSwitcherToken, AvailableSwitchNetwork } from '../const';

interface IGetTxDataArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  txHash: string;
}

export const { useGetSwitcherTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSwitcherTxData: build.query<IFetchTxData | undefined, IGetTxDataArgs>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataArgs,
        never,
        IFetchTxData | undefined
      >(async ({ chainId, txHash, token }) => {
        const sdk = await SwitcherSDK.getInstance();

        return {
          data: await retry(() => sdk.fetchTxData({ chainId, txHash, token }), {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      }),
    }),
  }),
});

interface IGetTxReceiptArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  txHash: string;
}

export const { useGetSwitcherTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSwitcherTxReceipt: build.query<
      IFetchTxReceiptData | undefined,
      IGetTxReceiptArgs
    >({
      queryFn: queryFnNotifyWrapper<
        IGetTxReceiptArgs,
        never,
        IFetchTxReceiptData | undefined
      >(
        async ({ chainId, txHash, token }) => {
          const sdk = await SwitcherSDK.getInstance();

          return {
            data: await retry(
              () => sdk.fetchTxReceipt({ chainId, txHash, token }),
              {
                retries: RETRIES_TO_GET_TX_DATA,
              },
            ),
          };
        },
        error => getExtendedErrorText(error, t('switcher.errors.tx-data')),
      ),
    }),
  }),
});
