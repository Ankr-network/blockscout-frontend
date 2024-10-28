import { IReferralCodeItem, Web3Address } from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IRequestParams {
  address?: Web3Address;
  include_bonus?: boolean;
  include_deleted?: boolean;
}

export const {
  useFetchReferralCodesQuery,
  useLazyFetchReferralCodesQuery,
  endpoints: { fetchReferralCodes },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchReferralCodes: build.query<IReferralCodeItem[], IRequestParams>({
      queryFn: async ({ address, include_bonus, include_deleted }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const userBundles = await backofficeGateway.getUserReferralCodes(
          address,
          include_bonus,
          include_deleted,
        );

        return {
          data: userBundles,
        };
      },
      providesTags: [AuthCacheTags.referralCoderData],
    }),
  }),
});
