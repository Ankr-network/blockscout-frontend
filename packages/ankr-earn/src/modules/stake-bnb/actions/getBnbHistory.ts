import { t } from '@ankr.com/common';

import {
  BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET,
  ITxHistory,
} from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { FULL_HISTORY_STEP } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/hooks/useHistory';

import { getBinanceSDK } from '../utils/getBinanceSDK';

export const { useLazyGetBnbHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBnbHistory: build.query<ITxHistory, number>({
      queryFn: queryFnNotifyWrapper<number, never, ITxHistory>(
        async step => {
          const sdk = await getBinanceSDK();
          const isFullHistory = step === FULL_HISTORY_STEP;

          if (isFullHistory) {
            return { data: await sdk.getFullTxHistory() };
          }

          const latestBlock = await sdk.getLatestBlock();

          const from =
            latestBlock - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET * (step + 1);
          const to = latestBlock - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET * step;

          return { data: await sdk.getTxHistoryRange(from, to) };
        },
        error => getExtendedErrorText(error, t('stake-bnb.errors.history')),
      ),
    }),
  }),
});
