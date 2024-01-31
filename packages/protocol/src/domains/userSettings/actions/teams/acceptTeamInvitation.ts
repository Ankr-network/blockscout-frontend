import { AcceptGroupInvitationParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export const {
  endpoints: { acceptTeamInvitation },
  useAcceptTeamInvitationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    acceptTeamInvitation: build.mutation<null, AcceptGroupInvitationParams>({
      invalidatesTags: [RequestType.UserGroupsList],
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        await api.acceptGroupInvitation(params);

        return { data: null };
      }),
    }),
  }),
  overrideExisting: true,
});
