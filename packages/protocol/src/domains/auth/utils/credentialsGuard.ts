import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';

import { GetState } from 'store';
import { selectAuthData } from '../store/authSlice';
import { t } from '../../../modules/i18n/utils/intl';

export interface Credentials {
  credentials?: IJwtToken;
  workerTokenData?: WorkerTokenData;
}

export function credentialsGuard(getState: GetState): Credentials {
  const authData = selectAuthData(getState());

  const { credentials, workerTokenData } = authData;

  if (!credentials) {
    throw new Error(t('error.insufficient-permissions'));
  }

  return { credentials, workerTokenData };
}
