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
import { Days } from 'modules/common/types';
import { XDC_MAX_UNSTAKE_PERIOD } from 'modules/stake/const';

import { XDC_BLOCK_14_DAYS_OFFSET } from '../const';

const TWO_WEEKS: Days = 14;

export const { useGetXdcPendingHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getXdcPendingHistory: build.query<ITxHistory, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxHistory>(
        async (_, { getState }) => {
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

          const blocksPerDay = XDC_BLOCK_14_DAYS_OFFSET / TWO_WEEKS;
          const from =
            latestBlockNumber - blocksPerDay * XDC_MAX_UNSTAKE_PERIOD;

          return {
            data: await XDC.getTxHistoryRange({
              address,
              from,
              provider,
              to: latestBlockNumber,
              isUnstakeOnly: true,
            }),
          };
        },
        error => getExtendedErrorText(error, t('stake-avax.errors.history')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});
