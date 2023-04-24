import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { GetState, RootState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import {
  formatJwtTokensAndDecrypt,
  getUserEndpointToken,
} from './getAllJwtTokenUtils';
import { getSortedJwtTokens, PRIMARY_TOKEN_INDEX } from '../utils/utils';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export interface IUserJwtToken {
  jwtTokens: JwtManagerToken[];
}

export const {
  useFetchAllJwtTokenRequestsQuery,
  useLazyFetchAllJwtTokenRequestsQuery,
  endpoints: { fetchAllJwtTokenRequests },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllJwtTokenRequests: build.query<IUserJwtToken, boolean | void>({
      queryFn: createNotifyingQueryFn(async (loading, { getState }) => {
        if (loading) return { data: { jwtTokens: [] } };
        const { selectedGroupAddress: group } = getSelectedGroupAddress(
          getState as GetState,
        );
        const accountGateway = MultiService.getService().getAccountGateway();

        const result = await accountGateway.getAllJwtToken({ group });

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

        const state = getState() as RootState;

        const groupToken =
          group &&
          primaryData &&
          (await getUserEndpointToken(
            primaryData?.jwt_data,
            primaryData?.is_encrypted,
          ));

        const { workerTokenData } = selectAuthData(state);

        const primaryEndpointToken = group
          ? groupToken
          : workerTokenData?.userEndpointToken;

        const decryptedTokens = await formatJwtTokensAndDecrypt(
          result,
          primaryEndpointToken,
        );

        return {
          data: {
            jwtTokens: getSortedJwtTokens(decryptedTokens),
          },
        };
      }),
    }),
  }),
  overrideExisting: true,
});
