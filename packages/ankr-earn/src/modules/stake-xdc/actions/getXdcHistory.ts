import { t } from '@ankr.com/common';
import { RootState } from 'store';

import {
  getWeb3LatestBlockNumber,
  ITxHistory,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { WalletCacheTags, XDC_PROVIDER_BY_ENV } from 'modules/common/const';

import { XDC_BLOCK_14_DAYS_OFFSET } from '../const';

export const { useLazyGetXdcHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getXdcHistory: build.query<ITxHistory, number>({
      queryFn: queryFnNotifyWrapper<number, never, ITxHistory>(
        async (step, { getState }) => {
          const providerManager = getProviderManager();

          const { address } = selectEthProviderData(getState() as RootState);

          const defaultState: ITxHistory = {
            unstakeHistory: [],
            stakeHistory: [],
          };

          if (!address) {
            return { data: defaultState };
          }

          const provider = await providerManager.getETHReadProvider(
            XDC_PROVIDER_BY_ENV,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return { data: defaultState };
          }

          const latestBlockNumber = await getWeb3LatestBlockNumber({
            provider,
          });

          const from =
            latestBlockNumber - XDC_BLOCK_14_DAYS_OFFSET * (step + 1);
          const to = latestBlockNumber - XDC_BLOCK_14_DAYS_OFFSET * step;

          return {
            data: await XDC.getTxHistoryRange({
              address,
              from,
              provider,
              to,
            }),
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-xdc.errors.tx-events-history')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});
