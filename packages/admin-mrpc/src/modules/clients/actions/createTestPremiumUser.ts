import { toast } from 'react-toastify';
import {
  ICreateTestClientRequest,
  ICreateTestClientResponse,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IApiResponse {
  user: ICreateTestClientResponse;
}

export const {
  useCreateTestPremiumUserMutation,
  endpoints: { createTestPremiumUser },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createTestPremiumUser: build.mutation<
      IApiResponse,
      ICreateTestClientRequest
    >({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        const user = await backofficeGateway.createTestPremiumUser(formData);

        return {
          data: { user },
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        queryFulfilled
          .then(res => {
            const { data } = res;
            if (typeof data.user === 'object' && data.user.token) {
              toast.success(`Created test user for ${data.user.address}`);
            } else {
              toast.error(`Failed to create user for ${data.user.address}`);
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
