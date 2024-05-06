import { AppDispatch } from 'store';
import { IAuthSlice, setAuthData } from 'domains/auth/store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { addSignedWorkerTokenToService } from 'domains/auth/actions/utils/addSignedWorkerTokenToService';
import { authFetchInstantJwtParticipantToken } from 'domains/auth/actions/instantJwt/fetchInstantJwtParticipantToken';

interface ILoginUserJwtParams {
  authData: IAuthSlice;
  dispatch: AppDispatch;
  totp?: string;
}

export const loginUserJwt = async ({
  authData,
  dispatch,
  totp,
}: ILoginUserJwtParams) => {
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

  addSignedWorkerTokenToService({
    service,
    signedWorkerToken: workerTokenData?.signedToken,
  });

  dispatch(
    setAuthData({
      ...authData,
      credentials: jwtToken,
      hasOauthLogin: true,
      workerTokenData,
    }),
  );
};
