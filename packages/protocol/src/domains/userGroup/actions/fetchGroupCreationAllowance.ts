import { IGetIsGroupCreationAvailableResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';

export const {
  endpoints: { userGroupFetchCreationAllowance },
  useUserGroupFetchCreationAllowanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userGroupFetchCreationAllowance: build.query<
      IGetIsGroupCreationAvailableResponse,
      void
    >({
      providesTags: [RequestType.GroupCreationAllowance],
      queryFn: async () => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getIsGroupCreationAvailable();

        return { data };
      },
    }),
  }),
});
