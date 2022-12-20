import { MultiService } from 'modules/api/MultiService';
import { buildGoogleAuthUrl } from './fetchLoginParamsUtils';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { oauthFetchLoginParams },
  useLazyOauthFetchLoginParamsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthFetchLoginParams: build.query<void, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const data = await service.getOauthGateway().getOauthLoginParams();

        const googleAuthUrl = buildGoogleAuthUrl(data);

        // redirect to google auth url
        window.location.replace(googleAuthUrl);
        // after successful login user will be redirected to
        // AuthRoutesConfig.oauth.path

        return { data: undefined };
      }),
    }),
  }),
});
