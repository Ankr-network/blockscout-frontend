import { t } from '@ankr.com/common';
import { store } from 'store';
import { TransactionReceipt } from 'web3-eth';

import {
  EthereumSSV,
  IStakeData,
  Web3KeyReadProvider,
} from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { CacheTags } from 'modules/common/const';

import { SSV_PROVIDER_ID } from '../const';

type TGetTxReceiptData = TransactionReceipt | null;

export const { useLazyGetSSVTxReceiptQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSSVTxReceipt: build.query<TGetTxReceiptData, IStakeData>({
      queryFn: queryFnNotifyWrapper<IStakeData, never, TGetTxReceiptData>(
        async ({ txHash }) => {
          const providerManager = getProviderManager();

          const { walletId } = selectEthProviderData(store.getState());

          if (!walletId) {
            return { data: null };
          }

          const provider = await providerManager.getProvider(
            SSV_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return { data: null };
          }

          return {
            data: await EthereumSSV.getTxReceipt({
              provider,
              txHash,
            }),
          };
        },
        error => getExtendedErrorText(error, t('stake-ssv.errors.tx-receipt')),
      ),
      providesTags: [CacheTags.account],
    }),
  }),
});
