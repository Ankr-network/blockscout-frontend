import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { formatJwtTokensAndDecrypt } from './getAllJwtTokenUtils';
import { getSortedJwtTokens, PRIMARY_TOKEN_INDEX } from '../utils/utils';

export interface IUserJwtToken {
  jwtTokens: JwtManagerToken[];
  maxTokensLimit: number;
}

export const {
  useFetchAllJwtTokenRequestsQuery,
  useLazyFetchAllJwtTokenRequestsQuery,
  endpoints: { fetchAllJwtTokenRequests },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllJwtTokenRequests: build.query<IUserJwtToken, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState }) => {
        const service = MultiService.getService().getAccountGateway();

        const result = await service.getAllJwtToken();

        const primaryData = result.find(
          item => item.index === PRIMARY_TOKEN_INDEX,
        );

        if (!primaryData) {
          result.push({
            index: PRIMARY_TOKEN_INDEX,
            jwt_data: '',
            is_encrypted: false,
          });
        }

        const maxTokensLimit = await service.getAllowedJwtTokensCount();
        const state = getState() as RootState;

        const { workerTokenData } = selectAuthData(state);
        const decryptedTokens = await formatJwtTokensAndDecrypt(
          result,
          workerTokenData?.userEndpointToken,
        );

        return {
          data: {
            jwtTokens: getSortedJwtTokens(decryptedTokens),
            maxTokensLimit,
          },
        };
      }),
    }),
  }),
});
