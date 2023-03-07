import { t } from '@ankr.com/common';

import { BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { Token } from 'modules/common/types/token';
import { IBaseHistoryData } from 'modules/stake/types';

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
        error => getExtendedErrorText(error, t('stake-bnb.errors.history')),
      ),
    }),
  }),
});
