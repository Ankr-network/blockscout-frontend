import { toast } from 'react-toastify';
import {
  IUpdateUserProfileRequest,
  IUpdateUserProfileResponse,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useUpdateUserProfileMutation,
  endpoints: { updateUserProfile },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateUserProfile: build.mutation<
      IUpdateUserProfileResponse,
      IUpdateUserProfileRequest
    >({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        const profileData = await backofficeGateway.updateUserProfile(params);

        return {
          data: profileData,
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        queryFulfilled
          .then(res => {
            const { data } = res;
            if (data.user.address) {
              toast.success(`Updated user profile for ${data.user.address}`);
            } else {
              toast.error(
                `Failed to update user profile for ${data.user.address}`,
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
