import { t } from '@ankr.com/common';

import {
  ITxHistory,
  MATIC_ETH_BLOCK_2_WEEKS_OFFSET,
} from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { FULL_HISTORY_STEP } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/hooks/useHistory';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const { useLazyGetMaticOnEthHistoryNewQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthHistoryNew: build.query<ITxHistory, number>({
      queryFn: queryFnNotifyWrapper<number, never, ITxHistory>(
        async step => {
          const sdk = await getPolygonOnEthereumSDK();
          const isFullHistory = step === FULL_HISTORY_STEP;

          if (isFullHistory) {
            return { data: await sdk.getFullTxHistory() };
          }

          const latestBlock = await sdk.getLatestBlock();

          const from =
            latestBlock - MATIC_ETH_BLOCK_2_WEEKS_OFFSET * (step + 1);
          const to = latestBlock - MATIC_ETH_BLOCK_2_WEEKS_OFFSET * step;

          return { data: await sdk.getTxHistoryRange(from, to) };
        },
        error =>
          getExtendedErrorText(error, t('stake-matic-common.errors.history')),
      ),
    }),
  }),
});
