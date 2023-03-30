import { t } from '@ankr.com/common';

import { AVAX_HISTORY_2_WEEKS_OFFSET, ITxHistory } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { FULL_HISTORY_STEP } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/hooks/useHistory';

import { getAvalancheSDK } from '../utils/getAvalancheSDK';

export const { useLazyGetAvaxHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAvaxHistory: build.query<ITxHistory, number>({
      queryFn: queryFnNotifyWrapper<number, never, ITxHistory>(
        async step => {
          const sdk = await getAvalancheSDK();
          const isFullHistory = step === FULL_HISTORY_STEP;

          if (isFullHistory) {
            return { data: await sdk.getFullTxHistory() };
          }

          const latestBlock = await sdk.getLatestBlock();

          const from = latestBlock - AVAX_HISTORY_2_WEEKS_OFFSET * (step + 1);
          const to = latestBlock - AVAX_HISTORY_2_WEEKS_OFFSET * step;

          return { data: await sdk.getTxHistoryRange(from, to) };
        },
        error => getExtendedErrorText(error, t('stake-avax.errors.history')),
      ),
    }),
  }),
});
