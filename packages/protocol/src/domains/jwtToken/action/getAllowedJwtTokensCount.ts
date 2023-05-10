import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { MINIMAL_TOKENS_LIMIT } from '../utils/utils';
import { IApiUserGroupParams } from 'multirpc-sdk';

export interface IAllowedJwtTokenInfo {
  maxTokensLimit: number;
  shouldShowTokenManager: boolean;
}

export const {
  useLazyFetchAllowedJwtTokensCountQuery,
  endpoints: { fetchAllowedJwtTokensCount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowedJwtTokensCount: build.query<
      IAllowedJwtTokenInfo,
      IApiUserGroupParams
    >({
      queryFn: async ({ group }) => {
        const service = MultiService.getService().getAccountGateway();

        const maxTokensLimit = await service.getAllowedJwtTokensCount({
          group,
        });

        const shouldShowTokenManager = maxTokensLimit >= MINIMAL_TOKENS_LIMIT;

        return {
          data: {
            maxTokensLimit,
            shouldShowTokenManager,
          },
        };
      },
    }),
  }),
});
