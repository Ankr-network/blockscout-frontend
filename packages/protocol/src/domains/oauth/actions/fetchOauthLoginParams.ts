import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { buildGoogleAuthUrl } from './fetchOauthLoginParamsUtils';

export const fetchOauthLoginParams = createSmartAction<RequestAction<null>>(
  'oauth/fetchOauthLoginParams',
  () => ({
    request: {
      promise: (async () => {})(),
    },
    meta: {
      onRequest: () => {
        return {
          promise: (async () => {
            const service = MultiService.getService();

            const data = await service.getOauthGateway().getOauthLoginParams();

            const googleAuthUrl = buildGoogleAuthUrl(data);

            // redirect to google auth url
            window.location.replace(googleAuthUrl);
            // after successful login user will be redirected to AuthRoutesConfig.oauth.path
          })(),
        };
      },
    },
  }),
);
