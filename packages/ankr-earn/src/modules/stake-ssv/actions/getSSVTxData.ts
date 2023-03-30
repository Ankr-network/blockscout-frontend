import { t } from '@ankr.com/common';
import retry from 'async-retry';
import { store } from 'store';

import {
  EthereumSSV,
  IStakeData,
  Web3KeyReadProvider,
} from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';
import { IFetchTxData } from 'modules/switcher/api/types';

import { SSV_PROVIDER_ID } from '../const';

type TGetTxData = IFetchTxData | null;

export const { useLazyGetSSVTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSSVTxData: build.query<TGetTxData, IStakeData>({
      queryFn: queryFnNotifyWrapper<IStakeData, never, TGetTxData>(
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
            data: await retry(
              () => EthereumSSV.getTxData({ provider, txHash }),
              {
                retries: RETRIES_TO_GET_TX_DATA,
              },
            ),
          };
        },
        error => getExtendedErrorText(error, t('stake-ssv.errors.tx-data')),
      ),
    }),
  }),
});
