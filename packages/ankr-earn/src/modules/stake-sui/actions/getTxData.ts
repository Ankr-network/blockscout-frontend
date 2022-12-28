import retry from 'async-retry';
import { RootState } from 'store';
import { SUI_PROVIDER_ID } from 'sui';
import { TransactionReceipt } from 'web3-eth';

import { IFetchTxData, Web3KeyWriteProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { getTxData, getTxReceipt } from '../api/getTxData';

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetSUITxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSUITxData: build.query<IFetchTxData | null, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        IFetchTxData | null
      >(async (args, { getState }) => {
        const providerManager = getProviderManager();

        const { walletId } = selectEthProviderData(getState() as RootState);

        if (!walletId) {
          return {
            data: null,
          };
        }

        const provider = await providerManager.getProvider(
          SUI_PROVIDER_ID,
          walletId,
        );

        if (!(provider instanceof Web3KeyWriteProvider)) {
          return {
            data: null,
          };
        }

        return {
          data: await retry(() => getTxData(), {
            retries: RETRIES_TO_GET_TX_DATA,
          }),
        };
      }),
    }),
  }),
});

export const { useGetSUITxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSUITxReceipt: build.query<TransactionReceipt | null, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetTxDataProps,
        never,
        TransactionReceipt | null
      >(async ({ txHash }, { getState }) => {
        const providerManager = getProviderManager();

        const { walletId } = selectEthProviderData(getState() as RootState);

        if (!walletId) {
          return {
            data: null,
          };
        }

        const provider = await providerManager.getProvider(
          SUI_PROVIDER_ID,
          walletId,
        );

        if (!(provider instanceof Web3KeyWriteProvider)) {
          return {
            data: null,
          };
        }

        return {
          data: await getTxReceipt({
            txHash,
            provider,
          }),
        };
      }),
    }),
  }),
});
