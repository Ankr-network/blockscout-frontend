import { t } from '@ankr.com/common';

import { AVAX_HISTORY_2_WEEKS_OFFSET } from '@ankr.com/staking-sdk';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { Token } from 'modules/common/types/token';
import { IBaseHistoryData } from 'modules/stake/types';

import { getAvalancheSDK } from '../utils/getAvalancheSDK';

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
          const sdk = await getAvalancheSDK();
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
        getOnErrorWithCustomText(t('stake-avax.errors.history')),
      ),
    }),
  }),
});
