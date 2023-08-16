import { toast } from 'react-toastify';
import { DeleteUserGroupRequest, DeleteUserGroupResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';

export const {
  useDeleteUserGroupMutation,
  endpoints: { deleteUserGroup },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteUserGroup: build.mutation<
      DeleteUserGroupResponse,
      DeleteUserGroupRequest
    >({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const group = await backofficeGateway.deleteUserGroup(formData);

        return {
          data: group,
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        queryFulfilled
          .then(res => {
            const { data } = res;

            toast.success(`Group was successfully deleted`);

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
