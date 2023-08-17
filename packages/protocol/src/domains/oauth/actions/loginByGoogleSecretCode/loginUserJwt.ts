import { AppDispatch } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { IAuthSlice, setAuthData } from 'domains/auth/store/authSlice';
import { authFetchInstantJwtParticipantToken } from 'domains/auth/actions/instantJwt/fetchInstantJwtParticipantToken';

export const loginUserJwt = async (
  dispatch: AppDispatch,
  authData: IAuthSlice,
  totp?: string,
) => {
  const service = MultiService.getService();

  const { data, error } = await dispatch(
    authFetchInstantJwtParticipantToken.initiate({ params: null, totp }),
  );

  if (error) {
    dispatch(
      setAuthData({
        ...authData,
        hasOauthLogin: true,
      }),
    );

    return;
  }

  const { jwtToken, workerTokenData } = data || {};

  if (workerTokenData?.signedToken) {
    service.getWorkerGateway().addJwtToken(workerTokenData?.signedToken);
  }

  dispatch(
    setAuthData({
      ...authData,
      credentials: jwtToken,
      hasOauthLogin: true,
      workerTokenData,
    }),
  );
};
