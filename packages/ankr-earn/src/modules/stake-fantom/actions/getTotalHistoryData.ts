import BigNumber from 'bignumber.js';

import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getFantomSDK } from '../utils/getFantomSDK';

export interface ITotalGetHistoryData {
  stakeEventsAFTMB: ITxEventsHistoryGroupItem[];
  stakeEventsAFTMC: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMB: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMC: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMB: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMC: ITxEventsHistoryGroupItem[];
  totalPending: BigNumber;
}

export const { useLazyGetFTMTotalHistoryDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMTotalHistoryData: build.query<ITotalGetHistoryData, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITotalGetHistoryData>(
        async () => {
          const sdk = await getFantomSDK();

          const [historyData, totalPending] = await Promise.all([
            sdk.getTxEventsHistory(),
            sdk.getPendingClaim(),
          ]);

          return {
            data: {
              stakeEventsAFTMB: historyData.completedBond,
              stakeEventsAFTMC: historyData.completedCertificate,
              pendingEventsAFTMB: historyData.pendingBond,
              pendingEventsAFTMC: historyData.pendingCertificate,
              withdrawnEventsAFTMB: historyData.unstakeBond,
              withdrawnEventsAFTMC: historyData.unstakeCertificate,
              totalPending,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
