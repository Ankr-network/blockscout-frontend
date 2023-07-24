import { IApiUserGroupParams } from 'multirpc-sdk';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { formatTokenAndDecryptJwt } from './getAllJwtTokenUtils';
import { fetchAllJwtTokenRequests } from './getAllJwtToken';

interface IRequestParams extends IApiUserGroupParams {
  tokenIndex: number;
}

export const {
  useLazyCreateJwtTokenQuery,
  endpoints: { createJwtToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createJwtToken: build.query<JwtManagerToken, IRequestParams>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ tokenIndex, group }, { dispatch }) => {
          const service = MultiService.getService().getAccountGateway();
          const jwtToken = await service.createJwtToken({
            index: tokenIndex,
            group,
          });

          const newDecryptedToken = await formatTokenAndDecryptJwt(jwtToken);

          dispatch(fetchAllJwtTokenRequests.initiate({ group }));

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
