import { MATIC_ETH_BLOCK_2_WEEKS_OFFSET } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export interface IGetHistoryData {
  [Token.aMATICb]: IBaseHistoryData;
  [Token.aMATICc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

export const { useLazyGetMaticOnEthHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthHistory: build.query<IGetHistoryData, IGetHistoryArgs>({
      queryFn: queryFnNotifyWrapper<IGetHistoryArgs, never, IGetHistoryData>(
        async ({ step }) => {
          const sdk = await getPolygonOnEthereumSDK();
          const latestBlock = await sdk.getLatestBlock();

          const from =
            latestBlock - MATIC_ETH_BLOCK_2_WEEKS_OFFSET * (step + 1);
          const to = latestBlock - MATIC_ETH_BLOCK_2_WEEKS_OFFSET * step;

          const historyData = await sdk.getTxEventsHistoryRange(from, to);

          return {
            data: {
              [Token.aMATICb]: {
                stakeEvents: historyData.completedBond,
                unstakeEvents: historyData.unstakeBond,
              },
              [Token.aMATICc]: {
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
