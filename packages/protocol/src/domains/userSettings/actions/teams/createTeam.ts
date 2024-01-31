import { ICreateUserGroupParams, ICreateUserGroupResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export const {
  endpoints: { createTeam },
  useCreateTeamMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createTeam: build.mutation<
      ICreateUserGroupResponse,
      ICreateUserGroupParams
    >({
      invalidatesTags: [
        RequestType.UserGroupsList,
        RequestType.GroupCreationAllowance,
      ],
      queryFn: createNotifyingQueryFn(async args => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.createUserGroup(args);

        return { data };
      }),
    }),
  }),
});
