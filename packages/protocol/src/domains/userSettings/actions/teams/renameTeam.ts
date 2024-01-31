import { IRenameGroupParams, IRenameGroupResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';

export const {
  endpoints: { renameTeam },
  useRenameTeamMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    renameTeam: build.mutation<IRenameGroupResponse, IRenameGroupParams>({
      invalidatesTags: [RequestType.UserGroupsList],
      queryFn: createNotifyingQueryFn(async args => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.renameTeam(args);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
