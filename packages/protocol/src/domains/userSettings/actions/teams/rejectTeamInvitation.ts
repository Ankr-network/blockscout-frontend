import { RejectGroupInvitationParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { rejectTeamInvitation },
  useRejectTeamInvitationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    rejectTeamInvitation: build.mutation<null, RejectGroupInvitationParams>({
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        await api.rejectGroupInvitation(params);

        return { data: null };
      }),
    }),
  }),
  overrideExisting: true,
});
