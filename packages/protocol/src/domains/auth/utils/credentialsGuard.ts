import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { t } from '../../../modules/i18n/utils/intl';
import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';
import { IFetchChainsResponseData } from '../../chains/api/queryChains';
import { Store } from '../../../store';
import { selectAuthData } from '../store/authSlice';

export const credentialsGuard = (
  request: {
    promise: (
      store: Store & { dispatchRequest: DispatchRequest },
      credentials: IJwtToken,
      workerTokenData?: WorkerTokenData,
    ) => Promise<IFetchChainsResponseData>;
  },
  action: RequestAction,
  store: Store & { dispatchRequest: DispatchRequest },
) => {
  return {
    promise: (async () => {
      const authData = selectAuthData(store.getState());

      const { credentials, workerTokenData } = authData;

      if (!credentials) {
        throw new Error(t('error.insufficient-permissions'));
      }

      return request.promise(store, credentials, workerTokenData);
    })(),
  };
};
