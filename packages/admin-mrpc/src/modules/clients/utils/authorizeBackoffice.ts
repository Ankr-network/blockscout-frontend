import { store } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { selectAuthData } from 'modules/auth/store/authSlice';
import { TOKEN_LIFETIME } from 'modules/common/const';

export const authorizeBackoffice = async () => {
  const service = await MultiService.getInstance();
  let { backofficeAuthorizationToken } = selectAuthData(store.getState());
  if (!backofficeAuthorizationToken) {
    backofficeAuthorizationToken = await service.authorizeBackoffice(
      TOKEN_LIFETIME,
    );
  }
  const backofficeGateway = await service.getBackofficeGateway();
  await backofficeGateway.addToken(backofficeAuthorizationToken);
};
