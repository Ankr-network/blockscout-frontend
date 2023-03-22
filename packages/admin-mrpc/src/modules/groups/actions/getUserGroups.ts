import { GetUserGroupsRequest, Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';

export type UserGroupItemMapped = {
  groupName: string;
  groupAddress: Web3Address;
};

export type UserGroupsList = UserGroupItemMapped[];

export const {
  useGetUserGroupsQuery,
  useLazyGetUserGroupsQuery,
  endpoints: { getUserGroups },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getUserGroups: build.query<UserGroupsList, GetUserGroupsRequest>({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        const response = await backofficeGateway.getUserGroups(formData);

        const groupsMapped = response?.groups?.map(
          ({ group_name, group_address }) => ({
            groupName: group_name,
            groupAddress: group_address,
          }),
        );

        return {
          data: groupsMapped || [],
        };
      },
    }),
  }),
  overrideExisting: true,
});
