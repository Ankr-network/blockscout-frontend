import { t } from '@ankr.com/common';

import {
  ITxHistory,
  MATIC_ETH_BLOCK_2_WEEKS_OFFSET,
} from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { WalletCacheTags } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { MATIC_MAX_UNSTAKE_PERIOD } from 'modules/stake/const';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

const TWO_WEEKS: Days = 14;

export const { useGetMaticOnEthPendingHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthPendingHistory: build.query<ITxHistory, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxHistory>(
        async () => {
          const sdk = await getPolygonOnEthereumSDK();
          const latestBlock = await sdk.getLatestBlock();
          const blocksPerDay = MATIC_ETH_BLOCK_2_WEEKS_OFFSET / TWO_WEEKS;
          const from = latestBlock - blocksPerDay * MATIC_MAX_UNSTAKE_PERIOD;

          return { data: await sdk.getTxHistoryRange(from, latestBlock, true) };
        },
        error =>
          getExtendedErrorText(error, t('stake-matic-common.errors.history')),
      ),
      providesTags: [WalletCacheTags.account],
    }),
  }),
});
