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
    fetchUserProfile: build.query<
      IGetUserProfileResponse | void,
      IApiRequestParams
    >({
      queryFn: async ({ address }) => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const userProfileResponse = await backofficeGateway
          .getUserProfile({
            address,
          })
          // catch is used here in order
          // not to show error notifications on profile 404 response
          // as not existing profile is a normal case
          // eslint-disable-next-line no-console
          .catch(console.warn);

        return {
          data: userProfileResponse,
        };
      },
    }),
  }),
  overrideExisting: true,
});
