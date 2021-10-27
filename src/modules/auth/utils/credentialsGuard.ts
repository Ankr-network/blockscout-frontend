import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { connect } from '../actions/connect';
import { t } from '../../i18n/utils/intl';
import { IJwtToken } from '@ankr.com/multirpc/dist/types';
import { IFetchChainsResponseData } from '../../../domains/chains/api/queryChains';
import { Store } from '../../../store';

export function credentialsGuard(
  request: {
    promise: (
      store: Store & { dispatchRequest: DispatchRequest },
      credentials: IJwtToken,
    ) => Promise<IFetchChainsResponseData>;
  },
  action: RequestAction,
  store: Store & { dispatchRequest: DispatchRequest },
) {
  return {
    promise: (async () => {
      const { data } = getQuery(store.getState(), {
        type: connect.toString(),
        action: connect,
      });

      if (!data?.credentials) {
        throw new Error(t('error.insufficient-permissions'));
      }

      const { credentials } = data;

      return request.promise(store, credentials);
    })(),
  };
}
