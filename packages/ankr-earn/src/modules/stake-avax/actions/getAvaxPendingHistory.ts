import { t } from '@ankr.com/common';

import { AVAX_HISTORY_2_WEEKS_OFFSET, ITxHistory } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { WalletCacheTags } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { AVAX_MAX_UNSTAKE_PERIOD } from 'modules/stake/const';

import { getAvalancheSDK } from '../utils/getAvalancheSDK';

const TWO_WEEKS: Days = 14;

export const { useGetAvaxPendingHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAvaxPendingHistory: build.query<ITxHistory, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxHistory>(
        async () => {
          const sdk = await getAvalancheSDK();
          const latestBlock = await sdk.getLatestBlock();
          const blocksPerDay = AVAX_HISTORY_2_WEEKS_OFFSET / TWO_WEEKS;
          const from = latestBlock - blocksPerDay * AVAX_MAX_UNSTAKE_PERIOD;

          return { data: await sdk.getTxHistoryRange(from, latestBlock, true) };
        },
        error => getExtendedErrorText(error, t('stake-avax.errors.history')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});
