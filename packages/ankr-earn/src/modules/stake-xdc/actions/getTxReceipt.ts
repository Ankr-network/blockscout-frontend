import { RootState } from 'store';
import { TransactionReceipt } from 'web3-eth';

import {
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { XDC_PROVIDER_ID } from '../const';

type TGetTxReceiptData = TransactionReceipt | null;

interface IGetTxReceiptProps {
  txHash: string;
}

export const { useGetTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTxReceipt: build.query<TGetTxReceiptData, IGetTxReceiptProps>({
      queryFn: queryFnNotifyWrapper<
        IGetTxReceiptProps,
        never,
        TGetTxReceiptData
      >(async ({ txHash }, { getState }) => {
        const providerManager = ProviderManagerSingleton.getInstance();

        const { walletId } = selectEthProviderData(getState() as RootState);

        if (!walletId) {
          return {
            data: null,
          };
        }

        const provider = await providerManager.getProvider(
          XDC_PROVIDER_ID,
          walletId,
        );

        if (!(provider instanceof Web3KeyReadProvider)) {
          return {
            data: null,
          };
        }

        return {
          data: await XDC.getTxReceipt({
            provider,
            txHash,
          }),
        };
      }),
    }),
  }),
});
