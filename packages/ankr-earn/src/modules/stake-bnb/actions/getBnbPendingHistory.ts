import { t } from '@ankr.com/common';

import {
  BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET,
  ITxHistory,
} from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { WalletCacheTags } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { BNB_MAX_UNSTAKE_PERIOD } from 'modules/stake/const';

import { getBinanceSDK } from '../utils/getBinanceSDK';

const TWO_WEEKS: Days = 14;

export const { useGetBnbPendingHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBnbPendingHistory: build.query<ITxHistory, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxHistory>(
        async () => {
          const sdk = await getBinanceSDK();
          const latestBlock = await sdk.getLatestBlock();
          const blocksPerDay = BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET / TWO_WEEKS;
          const from = latestBlock - blocksPerDay * BNB_MAX_UNSTAKE_PERIOD;

          return { data: await sdk.getTxHistoryRange(from, latestBlock, true) };
        },
        error => getExtendedErrorText(error, t('stake-bnb.errors.history')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});
