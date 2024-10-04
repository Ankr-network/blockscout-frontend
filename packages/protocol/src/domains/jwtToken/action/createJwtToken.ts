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
  endpoints: { createJwtToken },
  useCreateJwtTokenMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createJwtToken: build.mutation<JwtManagerToken, IRequestParams>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (
          { description, group, name, tokenIndex },
          { dispatch },
        ) => {
          const service = MultiService.getService().getAccountingGateway();

          const jwtToken = await service.createJwtToken(
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

          dispatch(
            fetchAllJwtTokenRequests.initiate(
              { group },
              { forceRefetch: true },
            ),
          );

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
