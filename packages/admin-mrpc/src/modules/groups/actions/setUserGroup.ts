import { toast } from 'react-toastify';
import { SetUserGroupRequest, SetUserGroupResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../../clients/utils/authorizeBackoffice';

export const {
  useSetUserGroupMutation,
  endpoints: { setUserGroup },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    setUserGroup: build.mutation<SetUserGroupResponse, SetUserGroupRequest>({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const group = await backofficeGateway.setUserGroup(formData);

        return {
          data: group,
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        queryFulfilled
          .then(res => {
            const { data } = res;

            if (data.address) {
              toast.success(`Added user ${data.address} to ${data.name} group`);
            } else {
              toast.error(
                `Failed to add user ${data.address} to ${data.name} group`,
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
