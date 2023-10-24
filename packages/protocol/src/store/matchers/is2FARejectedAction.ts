import { AnyAction, isAnyOf } from '@reduxjs/toolkit';

import { cancelBundleSubscription } from 'domains/account/actions/bundles/cancelBundleSubscription';
import { cancelSubscription } from 'domains/account/actions/subscriptions/cancelSubscription';
import { deleteJwtToken } from 'domains/jwtToken/action/deleteJwtToken';
import { is2FAError } from 'store/utils/is2FAError';
import { userSettingsAddNewEmailBinding } from 'domains/userSettings/actions/email/addNewEmailBinding';
import { oauthLoginJwt } from 'domains/oauth/actions/loginByGoogleSecretCode/oauthLoginJwt';
import { authMakeAuthorization } from 'domains/auth/actions/connect/authMakeAuthorization';
import { updateWhitelistMode } from 'domains/projects/actions/updateWhitelistMode';
import { addAddressToWhitelist } from 'domains/projects/actions/addAddressToWhitelist';
import { updateWhitelist } from 'domains/projects/actions/updateWhitelist';
import { addToWhitelist } from 'domains/projects/actions/addToWhitelist';
import { addBlockchainsToWhitelist } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { fetchEnterpriseEndpoints } from 'domains/enterprise/actions/fetchEnterpriseEndpoints';

// Top level endpoints that should be re-initiated if
// a 2FA error has been caught somewhere inside or in child endpoints.
const matcher = isAnyOf(
  authMakeAuthorization.matchRejected,
  cancelBundleSubscription.matchRejected,
  cancelSubscription.matchRejected,
  deleteJwtToken.matchRejected,
  oauthLoginJwt.matchRejected,
  userSettingsAddNewEmailBinding.matchRejected,
  updateWhitelistMode.matchRejected,
  addAddressToWhitelist.matchRejected,
  updateWhitelist.matchRejected,
  addToWhitelist.matchRejected,
  addBlockchainsToWhitelist.matchRejected,
  fetchEnterpriseEndpoints.matchRejected,
);

export const is2FARejectedAction = ((action: AnyAction) => {
  return matcher(action) && is2FAError(action.payload);
}) as typeof matcher;
