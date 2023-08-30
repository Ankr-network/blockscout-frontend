import { IApiUserGroupParams } from 'multirpc-sdk';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { formatTokenAndDecryptJwt } from './getAllJwtTokenUtils';
import { fetchAllJwtTokenRequests } from './getAllJwtToken';

interface IRequestParams extends IApiUserGroupParams {
  tokenIndex: number;
  name?: string;
  description?: string;
}

export const {
  useLazyUpdateJwtTokenQuery,
  endpoints: { updateJwtToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateJwtToken: build.query<JwtManagerToken, IRequestParams>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ tokenIndex, name, description, group }) => {
          const service = MultiService.getService().getAccountGateway();

          const jwtToken = await service.updateJwtToken(
            {
              name,
              description,
            },
            {
              index: tokenIndex,
              group,
            },
          );

          const newDecryptedToken = await formatTokenAndDecryptJwt(jwtToken);

          return { data: newDecryptedToken };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
      onQueryStarted: async ({ group }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(fetchAllJwtTokenRequests.initiate({ group }));
      },
    }),
  }),
});
