import { IApiUserGroupParams, IApiUserGroupDetails } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';

import { fetchGroups } from './fetchGroups';

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
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          // we should refetch all groups in case of details fetching error
          // to prevent showing outdated data
          dispatch(fetchGroups.initiate(undefined, { forceRefetch: true }));
        }
      },
    }),
  }),
  overrideExisting: true,
});
