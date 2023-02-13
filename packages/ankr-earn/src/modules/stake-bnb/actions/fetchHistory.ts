import { t } from '@ankr.com/common';

import { BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET } from '@ankr.com/staking-sdk';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

import { getBinanceSDK } from '../utils/getBinanceSDK';

export interface IGetHistoryData {
  [Token.aBNBb]: IBaseHistoryData;
  [Token.aBNBc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

export const { useLazyGetBNBHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBHistory: build.query<IGetHistoryData, IGetHistoryArgs>({
      queryFn: queryFnNotifyWrapper<IGetHistoryArgs, never, IGetHistoryData>(
        async ({ step }) => {
          const sdk = await getBinanceSDK();
          const latestBlock = await sdk.getLatestBlock();

          const from =
            latestBlock - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET * (step + 1);
          const to = latestBlock - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET * step;

          const historyData = await sdk.getTxEventsHistoryRange(from, to);

          return {
            data: {
              [Token.aBNBb]: {
                stakeEvents: historyData.completedBond,
                unstakeEvents: historyData.unstakeBond,
              },
              [Token.aBNBc]: {
                stakeEvents: historyData.completedCertificate,
                unstakeEvents: historyData.unstakeCertificate,
              },
            },
          };
        },
        getOnErrorWithCustomText(t('stake-bnb.errors.history')),
      ),
    }),
  }),
});
