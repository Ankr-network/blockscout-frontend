import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { MINIMAL_TOKENS_LIMIT } from '../utils/utils';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

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
      queryFn: createNotifyingQueryFn(async (_, { getState }) => {
        const service = MultiService.getService().getAccountGateway();
        const { selectedGroupAddress: group } = getSelectedGroupAddress(
          getState as GetState,
        );

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
      }),
    }),
  }),
});
