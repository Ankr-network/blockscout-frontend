import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { IFetchChainsResponseData } from '../../chains/api/queryChains';
import { Store } from '../../../store';
import { selectAuthData } from '../store/authSlice';
import { MultiService } from 'modules/api/MultiService';

export const authorizationGuard = (
  request: {
    promise: (
      store: Store & { dispatchRequest: DispatchRequest },
    ) => Promise<IFetchChainsResponseData>;
  },
  action: RequestAction,
  store: Store & { dispatchRequest: DispatchRequest },
) => {
  return {
    promise: (async () => {
      const authData = selectAuthData(store.getState());

      const { authorizationToken, workerTokenData } = authData;

      const web3ReadService = await MultiService.getWeb3ReadService();
      const service = MultiService.getService();

      if (authorizationToken) {
        service.getAccountGateway().addToken(authorizationToken);
        web3ReadService.getOauthGateway().addToken(authorizationToken);
      }

      if (workerTokenData?.signedToken) {
        service.getWorkerGateway().addJwtToken(workerTokenData?.signedToken);
      }

      return request.promise(store);
    })(),
  };
};
