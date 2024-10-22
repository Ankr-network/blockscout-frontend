import { IApiUserGroupParams } from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

import { fetchJWTs } from './getAllJwtToken';
import { formatTokenAndDecryptJwt } from './getAllJwtTokenUtils';

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
    createJwtToken: build.mutation<JWT, IRequestParams>({
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

          dispatch(fetchJWTs.initiate({ group }, { forceRefetch: true }));

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
