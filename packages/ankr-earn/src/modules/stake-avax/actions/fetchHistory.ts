import {
  AvalancheSDK,
  AVAX_HISTORY_2_WEEKS_OFFSET,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

export interface IGetHistoryData {
  [Token.aAVAXb]: IBaseHistoryData;
  [Token.aAVAXc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

export const { useLazyGetAVAXHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXHistory: build.query<IGetHistoryData, IGetHistoryArgs>({
      queryFn: queryFnNotifyWrapper<IGetHistoryArgs, never, IGetHistoryData>(
        async ({ step }) => {
          const sdk = await AvalancheSDK.getInstance();
          const latestBlock = await sdk.getLatestBlock();

          const from = latestBlock - AVAX_HISTORY_2_WEEKS_OFFSET * (step + 1);
          const to = latestBlock - AVAX_HISTORY_2_WEEKS_OFFSET * step;

          const historyData = await sdk.getTxEventsHistoryRange(from, to);

          return {
            data: {
              [Token.aAVAXb]: {
                stakeEvents: historyData.completedBond,
                unstakeEvents: historyData.unstakeBond,
              },
              [Token.aAVAXc]: {
                stakeEvents: historyData.completedCertificate,
                unstakeEvents: historyData.unstakeCertificate,
              },
            },
          };
        },
      ),
    }),
  }),
});
