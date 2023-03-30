import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { MINIMAL_TOKENS_LIMIT } from '../utils/utils';

export interface IAllowedJwtTokenInfo {
  maxTokensLimit: number;
  shouldShowTokenManager: boolean;
}

export const {
  useFetchAllowedJwtTokensCountQuery,
  endpoints: { fetchAllowedJwtTokensCount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowedJwtTokensCount: build.query<IAllowedJwtTokenInfo, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService().getAccountGateway();

        const maxTokensLimit = await service.getAllowedJwtTokensCount();

        const shouldShowTokenManager = maxTokensLimit >= MINIMAL_TOKENS_LIMIT;

        return {
          data: {
            maxTokensLimit,
            shouldShowTokenManager,
          },
        };
      }),
    }),
  }),
});
