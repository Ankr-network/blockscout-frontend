import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { formatTokenAndDecryptJwt } from './getAllJwtTokenUtils';
import { fetchAllJwtTokenRequests } from './getAllJwtToken';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';
import { GetState } from 'store';

export const {
  useLazyCreateJwtTokenQuery,
  endpoints: { createJwtToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createJwtToken: build.query<JwtManagerToken, number>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (tokenIndex, { dispatch, getState }) => {
          const service = MultiService.getService().getAccountGateway();
          const { selectedGroupAddress: group } = getSelectedGroupAddress(
            getState as GetState,
          );
          const jwtToken = await service.createJwtToken({
            index: tokenIndex,
            group,
          });

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
