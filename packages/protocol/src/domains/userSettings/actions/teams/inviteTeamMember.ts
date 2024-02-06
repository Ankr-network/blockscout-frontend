import {
  InviteGroupMemeberParams,
  InviteGroupMemeberResult,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import { getInviteTeamMemberError } from './utils/getInviteTeamMemberError';

export const {
  endpoints: { inviteTeamMember },
  useInviteTeamMemberMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    inviteTeamMember: build.mutation<
      InviteGroupMemeberResult,
      InviteGroupMemeberParams
    >({
      invalidatesTags: [RequestType.UserGroupDetails],
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.inviteGroupMember(params);
        const error = getInviteTeamMemberError(data);

        if (error) {
          return { error };
        }

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
