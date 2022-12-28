import { ETH_BLOCK_2_WEEKS_OFFSET } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

import { getEthereumSDK } from '../utils/getEthereumSDK';

export interface IGetHistoryData {
  [Token.aETHb]: IBaseHistoryData;
  [Token.aETHc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

export const { useLazyGetETHHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHHistory: build.query<IGetHistoryData, IGetHistoryArgs>({
      queryFn: queryFnNotifyWrapper<IGetHistoryArgs, never, IGetHistoryData>(
        async ({ step }) => {
          const sdk = await getEthereumSDK();
          const latestBlock = await sdk.getLatestBlock();

          const from = latestBlock - ETH_BLOCK_2_WEEKS_OFFSET * (step + 1);
          const to = latestBlock - ETH_BLOCK_2_WEEKS_OFFSET * step;

          const historyData = await sdk.getTxEventsHistoryRange(from, to);

          return {
            data: {
              [Token.aETHb]: {
                stakeEvents: historyData.completedBond,
                unstakeEvents: historyData.unstakeBond,
              },
              [Token.aETHc]: {
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
