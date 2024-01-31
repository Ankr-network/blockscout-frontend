import { OauthLoginProvider } from 'multirpc-sdk';

import { shrinkUserData } from 'domains/auth/components/SignupButton/SignupButtonUtils';

export interface GetAccountNameParams {
  address?: string;
  email?: string;
  hasOauthWithoutWeb3: boolean;
  loginName?: string;
  oauthProvider?: OauthLoginProvider;
}

export const getAccountName = ({
  address,
  email,
  hasOauthWithoutWeb3,
  loginName,
  oauthProvider,
}: GetAccountNameParams) => {
  const {
    address: shrinkedAddress,
    email: shrinkedEmail,
    loginName: shrinkedLoginName,
  } = shrinkUserData(address, email, loginName);

  const isGoogle = oauthProvider === OauthLoginProvider.Google;

  if (hasOauthWithoutWeb3) {
    return isGoogle ? shrinkedEmail : shrinkedLoginName;
  }

  return shrinkedAddress;
};
