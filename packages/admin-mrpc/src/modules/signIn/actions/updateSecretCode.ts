import {
  AuthProviderEnum,
  IPostSecretCodeResult,
  LoginTypeEnum,
} from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { setAuthData } from 'modules/auth/store/authSlice';
import {
  AUTH_REDIRECT_URL,
  BACKOFFICE_AUTH_APPLICATION_NAME,
} from 'modules/common/const';

interface IUseUpdateSecretCodeMutationArgs {
  provider: AuthProviderEnum;
  secretCode: string;
  state?: string;
}

export interface IUpdateSecretCodeResponse
  extends Omit<IPostSecretCodeResult, 'expiresAt'> {
  expiresAt: string;
}

export const {
  useUpdateSecretCodeMutation,
  endpoints: { updateSecretCode },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateSecretCode: build.mutation<
      IUpdateSecretCodeResponse,
      IUseUpdateSecretCodeMutationArgs
    >({
      queryFn: async ({ provider, secretCode, state = 'default' }) => {
        const service = await MultiService.getWeb3Service();
        const uAuthGateway = service.getUAuthGateway();

        const data = await uAuthGateway.updateCredentials({
          provider,
          secretCode,
          state,
          type: LoginTypeEnum.LOGIN_TYPE_SINGLE_APP,
          application: BACKOFFICE_AUTH_APPLICATION_NAME,
          redirectUrl: AUTH_REDIRECT_URL,
        });

        return {
          data: {
            ...data.result,
            expiresAt: data.result.expiresAt,
          },
        };
      },
      onQueryStarted: async ({ provider }, { queryFulfilled, dispatch }) => {
        queryFulfilled.then(res => {
          if (res.data) {
            dispatch(
              setAuthData({
                backofficeAuthorizationToken: res.data.accessToken,
                expiresAt: res.data.expiresAt,
                provider,
              }),
            );
          }
        });
      },
      invalidatesTags: [AuthCacheTags.emailData],
    }),
  }),
  overrideExisting: true,
});
