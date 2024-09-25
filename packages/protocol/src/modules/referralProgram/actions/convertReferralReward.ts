import { IConvertReferralRewardParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';

export const {
  endpoints: { convertReferralReward },
  useConvertReferralRewardMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    convertReferralReward: build.mutation<
      boolean,
      IConvertReferralRewardParams
    >({
      invalidatesTags: [RequestType.RewardBalance, RequestType.RewardTxs],
      queryFn: async params => {
        const api = MultiService.getService().getAccountingGateway();

        await api.convertReferralReward(params);

        return { data: true };
      },
    }),
  }),
  overrideExisting: true,
});
