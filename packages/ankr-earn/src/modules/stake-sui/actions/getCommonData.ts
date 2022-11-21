import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';

import { CacheTags } from '../const';

interface IGetCommonData {
  suiBalance: BigNumber;
  minStake: BigNumber;
  pendingUnstakes: BigNumber;
  aSUIcBalance: BigNumber;
  aSUIcRatio: BigNumber;
}

export const { useGetSUICommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSUICommonData: build.query<IGetCommonData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetCommonData>(async () => {
        return {
          data: {
            suiBalance: ZERO,
            minStake: ZERO,
            pendingUnstakes: ZERO,
            aSUIcBalance: ZERO,
            aSUIcRatio: ZERO,
          },
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
