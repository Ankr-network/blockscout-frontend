import { ITwoFAStatusResponse, Web3Address } from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IRequestParams {
  address: Web3Address;
}

export const {
  useFetch2FAStatusQuery,
  endpoints: { fetch2FAStatus },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetch2FAStatus: build.query<ITwoFAStatusResponse, IRequestParams>({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const twoFAStatus = await backofficeGateway.getTwoFAStatus(address);

        return {
          data: twoFAStatus,
        };
      },
      providesTags: [AuthCacheTags.twoFAData],
    }),
  }),
});
