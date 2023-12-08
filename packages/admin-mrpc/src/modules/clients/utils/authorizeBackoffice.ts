import { store } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { resetAuthData, selectAuthData } from 'modules/auth/store/authSlice';

export const authorizeBackoffice = async () => {
  const service = await MultiService.getWeb3Service();
  const { backofficeAuthorizationToken, expiresAt } = selectAuthData(
    store.getState(),
  );

  const nowTimestamp = new Date().getDate();
  const expiresTimestamp = expiresAt ? new Date(expiresAt).getDate() : 0;

  const isTokenExpired = nowTimestamp > expiresTimestamp;

  if (!backofficeAuthorizationToken || isTokenExpired) {
    store.dispatch(resetAuthData());
    throw Error('not authorized');
  }

  const backofficeGateway = await service.getBackofficeGateway();

  await backofficeGateway.addToken(backofficeAuthorizationToken);

  return backofficeAuthorizationToken;
};
