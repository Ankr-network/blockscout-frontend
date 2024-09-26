import { ICreateReferralCodeParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export const {
  endpoints: { createReferralCode },
  useCreateReferralCodeMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createReferralCode: build.mutation<
      string,
      ICreateReferralCodeParams | void
    >({
      invalidatesTags: [RequestType.ReferralCodes],
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        const referralCode = await api.createReferralCode(params ?? undefined);

        return { data: referralCode };
      }),
      onQueryStarted: async ({ group } = {}, { dispatch, queryFulfilled }) => {
        const { data: referralCode } = await queryFulfilled;

        if (referralCode) {
          // optimistic update
          dispatch(
            web3Api.util.updateQueryData(
              'fetchReferralCodes' as unknown as never,
              { group } as unknown as never,
              (referralCodes = []) => [...referralCodes, referralCode],
            ),
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});
