import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { GetState } from 'store';
import { selectAuthData } from '../store/authSlice';

export interface Credentials {
  credentials?: IJwtToken;
  workerTokenData?: WorkerTokenData;
}

export function credentialsGuard(getState: GetState): Credentials {
  const authData = selectAuthData(getState());

  const { credentials, workerTokenData } = authData;

  const hasPermission = Boolean(credentials || workerTokenData);

  if (!hasPermission) {
    throw new Error(t('error.insufficient-permissions'));
  }

  return { credentials, workerTokenData };
}
