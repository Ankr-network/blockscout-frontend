import { AnyAction, isAnyOf } from '@reduxjs/toolkit';

import { addBlockchainsToWhitelist } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { addToWhitelist } from 'domains/projects/actions/addToWhitelist';
import { authMakeAuthorization } from 'domains/auth/actions/connect/authMakeAuthorization';
import { cancelBundleSubscription } from 'domains/account/actions/bundles/cancelBundleSubscription';
import { cancelSubscription } from 'domains/account/actions/subscriptions/cancelSubscription';
import { deleteJwtToken } from 'domains/jwtToken/action/deleteJwtToken';
import { fetchEnterpriseEndpoints } from 'domains/enterprise/actions/fetchEnterpriseEndpoints';
import { is2FAError } from 'store/utils/is2FAError';
import { oauthLoginJwt } from 'domains/oauth/actions/loginByGoogleSecretCode/oauthLoginJwt';
import { updateWhitelistMode } from 'domains/projects/actions/updateWhitelistMode';
import { userSettingsAddNewEmailBinding } from 'domains/userSettings/actions/email/addNewEmailBinding';
import { unbindLoginProvider } from 'domains/userSettings/actions/email/unbindLoginProvider';

// Top level endpoints that should be re-initiated if
// a 2FA error has been caught somewhere inside or in child endpoints.
const matcher = isAnyOf(
  addBlockchainsToWhitelist.matchRejected,
  addToWhitelist.matchRejected,
  authMakeAuthorization.matchRejected,
  cancelBundleSubscription.matchRejected,
  cancelSubscription.matchRejected,
  deleteJwtToken.matchRejected,
  fetchEnterpriseEndpoints.matchRejected,
  oauthLoginJwt.matchRejected,
  updateWhitelistMode.matchRejected,
  userSettingsAddNewEmailBinding.matchRejected,
  unbindLoginProvider.matchRejected,
);

export const is2FARejectedAction = ((action: AnyAction) => {
  return matcher(action) && is2FAError(action.payload);
}) as typeof matcher;
