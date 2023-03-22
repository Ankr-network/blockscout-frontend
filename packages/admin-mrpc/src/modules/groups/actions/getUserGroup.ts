import { GetUserGroupRequest, GetUserGroupResponse } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';

export const {
  useGetUserGroupQuery,
  useLazyGetUserGroupQuery,
  endpoints: { getUserGroup },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getUserGroup: build.query<GetUserGroupResponse, GetUserGroupRequest>({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        const group = await backofficeGateway.getUserGroup(formData);

        return {
          data: group,
        };
      },
    }),
  }),
  overrideExisting: true,
});
