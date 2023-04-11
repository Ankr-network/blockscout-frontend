import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { GetState } from 'store';
import { authorizationGuard } from 'domains/auth/utils/authorizationGuard';
import { getUserEndpointToken } from 'domains/jwtToken/action/getAllJwtTokenUtils';
import { getSelectedGroupAddress } from '../utils/getSelectedGroupAddress';

export const {
  endpoints: { userGroupFetchGroupJwt },
  useLazyUserGroupFetchGroupJwtQuery,
  useUserGroupFetchGroupJwtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userGroupFetchGroupJwt: build.query<string | null, void>({
      queryFn: async (_arg, { getState }) => {
        await authorizationGuard(getState as GetState);
        const group = getSelectedGroupAddress(getState as GetState);
        const service = MultiService.getService();
        const accountGateway = service.getAccountGateway();

        if (!group) {
          return { data: null };
        }

        const response = await accountGateway.getGroupJwtToken({ group });
        const decryptedToken = await getUserEndpointToken(
          response?.jwt_data,
          false,
        );

        return { data: decryptedToken };
      },
    }),
  }),
});
