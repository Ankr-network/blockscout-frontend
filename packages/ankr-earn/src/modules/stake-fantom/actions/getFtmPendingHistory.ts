import { t } from '@ankr.com/common';

import { FANTOM_BLOCK_WEEK_OFFSET, ITxHistory } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { WalletCacheTags } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { FTM_MAX_UNSTAKE_PERIOD } from 'modules/stake/const';

import { getFantomSDK } from '../utils/getFantomSDK';

const ONE_WEEK: Days = 7;

export const { useGetFtmPendingHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFtmPendingHistory: build.query<ITxHistory, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxHistory>(
        async () => {
          const sdk = await getFantomSDK();
          const latestBlock = await sdk.getLatestBlock();
          const blocksPerDay = FANTOM_BLOCK_WEEK_OFFSET / ONE_WEEK;
          const from = latestBlock - blocksPerDay * FTM_MAX_UNSTAKE_PERIOD;

          return { data: await sdk.getTxHistoryRange(from, latestBlock, true) };
        },
        error => getExtendedErrorText(error, t('stake-fantom.errors.history')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});
