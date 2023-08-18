import { toast } from 'react-toastify';
import {
  DeleteFromUserGroupRequest,
  DeleteFromUserGroupResponse,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../../clients/utils/authorizeBackoffice';

export const {
  useDeleteFromUserGroupMutation,
  endpoints: { deleteFromUserGroup },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteFromUserGroup: build.mutation<
      DeleteFromUserGroupResponse,
      DeleteFromUserGroupRequest
    >({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const group = await backofficeGateway.deleteFromUserGroup(formData);

        return {
          data: group,
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        queryFulfilled
          .then(res => {
            const { data } = res;

            if (data.address) {
              toast.success(
                `User ${data.address} is deleted from ${data.name} group`,
              );
            } else {
              toast.error(
                `Failed to delete user ${data.address} from ${data.name} group`,
              );
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
