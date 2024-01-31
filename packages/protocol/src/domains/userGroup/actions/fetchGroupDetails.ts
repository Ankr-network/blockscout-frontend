import { IApiUserGroupParams, IApiUserGroupDetails } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';

export const {
  endpoints: { userGroupFetchGroupDetails },
  useLazyUserGroupFetchGroupDetailsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userGroupFetchGroupDetails: build.query<
      IApiUserGroupDetails,
      IApiUserGroupParams
    >({
      providesTags: [RequestType.UserGroupDetails],
      queryFn: async params => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getUserGroupDetails(params);

        return { data };
      },
    }),
  }),
});
