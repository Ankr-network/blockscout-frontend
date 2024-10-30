import { IApiUserGroupParams } from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

import {
  formatJwtTokensAndDecrypt,
  getUserEndpointToken,
} from './getAllJwtTokenUtils';
import { getSortedJwtTokens, PRIMARY_TOKEN_INDEX } from '../utils/utils';

export interface IFetchJWTsParams extends IApiUserGroupParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchJWTs },
  useFetchJWTsQuery,
  useLazyFetchJWTsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchJWTs: build.query<JWT[], IFetchJWTsParams>({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        const api = MultiService.getService().getAccountingGateway();

        const result = await api.getAllJwtToken({ group });

        const primaryData = result.find(
          item => item.index === PRIMARY_TOKEN_INDEX,
        );

        if (!primaryData) {
          result.push({
            index: PRIMARY_TOKEN_INDEX,
            name: '',
            description: '',
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

        const data = getSortedJwtTokens(decryptedTokens);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectJWTs,
  selectLoadingCachedByParams: selectJWTsLoading,
  selectStateCachedByParams: selectJWTsState,
} = createQuerySelectors({ endpoint: fetchJWTs, fallback: [] });
