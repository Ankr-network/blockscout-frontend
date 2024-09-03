import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useDisable2FAMutation,
  endpoints: { disable2FA },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    disable2FA: build.mutation<void, string>({
      queryFn: async address => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const twoFAData = await backofficeGateway.disableTwoFA(address);

        return {
          data: twoFAData,
        };
      },
      invalidatesTags: [AuthCacheTags.twoFAData],
    }),
  }),
  overrideExisting: true,
});
