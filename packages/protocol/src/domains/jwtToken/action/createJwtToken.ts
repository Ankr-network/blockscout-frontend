import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { formatTokenAndDecryptJwt } from './getAllJwtTokenUtils';
import { fetchAllJwtTokenRequests } from './getAllJwtToken';

export const {
  useLazyCreateJwtTokenQuery,
  endpoints: { createJwtToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createJwtToken: build.query<JwtManagerToken, number>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (tokenIndex, { dispatch }) => {
          const service = MultiService.getService().getAccountGateway();

          const jwtToken = await service.createJwtToken(tokenIndex);

          const newDecryptedToken = await formatTokenAndDecryptJwt(jwtToken);

          dispatch(fetchAllJwtTokenRequests.initiate());

          return { data: newDecryptedToken };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
    }),
  }),
});
