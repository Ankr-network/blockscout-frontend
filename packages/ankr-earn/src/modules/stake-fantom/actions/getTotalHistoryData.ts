import BigNumber from 'bignumber.js';

import { ITxEventsHistoryGroupItem, FantomSDK } from '@ankr.com/staking-sdk';

import { web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

export interface ITotalGetHistoryData {
  stakeEventsAFTMB: ITxEventsHistoryGroupItem[];
  stakeEventsAFTMC: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMB: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMC: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMB: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMC: ITxEventsHistoryGroupItem[];
  totalPending: BigNumber;
}

export const { useGetFTMTotalHistoryDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMTotalHistoryData: build.query<ITotalGetHistoryData, void>({
      queryFn: async () => {
        const sdk = await FantomSDK.getInstance();

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
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
