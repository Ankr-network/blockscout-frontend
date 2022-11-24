import { IOauthLoginParams } from 'multirpc-sdk';

export const buildGoogleAuthUrl = (oauthParams: IOauthLoginParams) => {
  // eslint-disable-next-line
  const { oauth_url, client_id, scopes, state, redirect_url } = oauthParams;

  const googleAuthUrl = new URL(oauth_url);
  googleAuthUrl.searchParams.append('client_id', client_id);
  googleAuthUrl.searchParams.append('scope', scopes);
  googleAuthUrl.searchParams.append('state', state);
  googleAuthUrl.searchParams.append('redirect_uri', redirect_url);
  googleAuthUrl.searchParams.append('response_type', 'code');
  googleAuthUrl.searchParams.append('prompt', 'select_account');

  return googleAuthUrl.toString();
};
