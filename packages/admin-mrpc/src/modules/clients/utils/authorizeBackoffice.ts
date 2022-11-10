import { store } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { selectAuthData } from 'modules/auth/store/authSlice';

export const authorizeBackoffice = async () => {
  const service = await MultiService.getInstance();
  const { backofficeAuthorizationToken } = selectAuthData(store.getState());
  if (!backofficeAuthorizationToken) {
    throw Error('not authorized');
  }
  const backofficeGateway = await service.getBackofficeGateway();
  await backofficeGateway.addToken(backofficeAuthorizationToken);
  return backofficeAuthorizationToken;
};
