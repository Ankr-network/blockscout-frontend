import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { LIFETIME } from 'domains/chains/utils/timeframeUtils';

export const {
  endpoints: { authAuthorizeProvider },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authAuthorizeProvider: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getWeb3Service();

        const accessToken = await service.getAuthorizationToken(LIFETIME);

        if (!accessToken) {
          throw new Error(t('error.access-token-error'));
        }

        return { data: accessToken };
      }),
    }),
  }),
});
