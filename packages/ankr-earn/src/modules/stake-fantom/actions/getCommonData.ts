import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getFantomSDK } from '../utils/getFantomSDK';

interface IGetCommonData {
  ftmBalance: BigNumber;
  minStake: BigNumber;
  aFTMbBalance: BigNumber;
  bondPendingUnstakes: BigNumber;
  certPendingUnstakes: BigNumber;
  aFTMcBalance: BigNumber;
  aFTMcRatio: BigNumber;
}

export const { useGetFTMCommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMCommonData: build.query<IGetCommonData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetCommonData>(async () => {
        const sdk = await getFantomSDK();

        const [
          ftmBalance,
          minStake,
          aFTMbBalance,
          {
            pendingBond: bondPendingUnstakes,
            pendingCertificate: certPendingUnstakes,
          },
          aFTMcBalance,
          aFTMcRatio,
        ] = await Promise.all([
          sdk.getFtmBalance(),
          sdk.getMinimumStake(),
          sdk.getABBalance(),
          sdk.getPendingData(),
          sdk.getACBalance(),
          sdk.getACRatio(),
        ]);

        return {
          data: {
            ftmBalance,
            minStake,
            aFTMbBalance,
            bondPendingUnstakes,
            certPendingUnstakes,
            aFTMcBalance,
            aFTMcRatio,
          },
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
