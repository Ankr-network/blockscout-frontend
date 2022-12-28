import { FANTOM_BLOCK_WEEK_OFFSET } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

import { getFantomSDK } from '../utils/getFantomSDK';

export interface IGetHistoryData {
  [Token.aFTMb]: IBaseHistoryData;
  [Token.aFTMc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

const FANTOM_BLOCK_2_WEEKS_OFFSET = FANTOM_BLOCK_WEEK_OFFSET * 2;

export const { useLazyGetFTMHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMHistory: build.query<IGetHistoryData, IGetHistoryArgs>({
      queryFn: queryFnNotifyWrapper<IGetHistoryArgs, never, IGetHistoryData>(
        async ({ step }) => {
          const sdk = await getFantomSDK();
          const latestBlock = await sdk.getLatestBlock();

          const from = latestBlock - FANTOM_BLOCK_2_WEEKS_OFFSET * (step + 1);
          const to = latestBlock - FANTOM_BLOCK_2_WEEKS_OFFSET * step;

          const historyData = await sdk.getTxEventsHistoryRange(from, to);

          return {
            data: {
              [Token.aFTMb]: {
                stakeEvents: historyData.completedBond,
                unstakeEvents: historyData.unstakeBond,
              },
              [Token.aFTMc]: {
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
