import { toast } from 'react-toastify';
import { CreateUserGroupRequest, CreateUserGroupResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';

export const {
  useCreateUserGroupMutation,
  endpoints: { createUserGroup },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createUserGroup: build.mutation<
      CreateUserGroupResponse,
      CreateUserGroupRequest
    >({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const group = await backofficeGateway.createUserGroup(formData);

        return {
          data: group,
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        queryFulfilled
          .then(res => {
            const { data } = res;

            if (data.name) {
              toast.success(`Group ${data.name} is successfully created`);
            }

            return data;
          })
          .catch(error => {
            toast.error({ message: error.message });
            throw error;
          });
      },
    }),
  }),
  overrideExisting: true,
});
