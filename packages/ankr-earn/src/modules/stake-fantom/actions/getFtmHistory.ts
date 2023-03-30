import { t } from '@ankr.com/common';

import { FANTOM_BLOCK_WEEK_OFFSET, ITxHistory } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { FULL_HISTORY_STEP } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/hooks/useHistory';

import { getFantomSDK } from '../utils/getFantomSDK';

const FANTOM_BLOCK_2_WEEKS_OFFSET = FANTOM_BLOCK_WEEK_OFFSET * 2;

export const { useLazyGetFtmHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFtmHistory: build.query<ITxHistory, number>({
      queryFn: queryFnNotifyWrapper<number, never, ITxHistory>(
        async step => {
          const sdk = await getFantomSDK();
          const isFullHistory = step === FULL_HISTORY_STEP;

          if (isFullHistory) {
            return { data: await sdk.getFullTxHistory() };
          }

          const latestBlock = await sdk.getLatestBlock();

          const from = latestBlock - FANTOM_BLOCK_2_WEEKS_OFFSET * (step + 1);
          const to = latestBlock - FANTOM_BLOCK_2_WEEKS_OFFSET * step;

          return { data: await sdk.getTxHistoryRange(from, to) };
        },
        error => getExtendedErrorText(error, t('stake-fantom.errors.history')),
      ),
    }),
  }),
});
