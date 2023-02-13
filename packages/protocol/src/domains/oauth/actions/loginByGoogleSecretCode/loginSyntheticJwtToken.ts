import { AppDispatch } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { IAuthSlice, setAuthData } from 'domains/auth/store/authSlice';

export const loginSyntheticJwt = async (
  dispatch: AppDispatch,
  authData: IAuthSlice,
) => {
  const service = MultiService.getService();
  const web3ReadService = await MultiService.getWeb3ReadService();

  const syntheticTokenData = await service
    .getOauthGateway()
    .getSyntheticJwtToken();

  const { jwtToken, workerTokenData } =
    await web3ReadService.upgradeSyntheticJwtToken(
      syntheticTokenData?.jwt_data,
    );

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
