import { IGetUserProfileResponse, Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IApiRequestParams {
  address: Web3Address;
}

export const {
  useFetchUserProfileQuery,
  endpoints: { fetchUserProfile },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserProfile: build.query<IGetUserProfileResponse, IApiRequestParams>({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const userProfileResponse = await backofficeGateway.getUserProfile({
          address,
        });

        return {
          data: userProfileResponse,
        };
      },
    }),
  }),
  overrideExisting: true,
});
