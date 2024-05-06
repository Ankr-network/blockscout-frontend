import { AppDispatch } from 'store';
import { IAuthSlice, setAuthData } from 'domains/auth/store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { addSignedWorkerTokenToService } from 'domains/auth/actions/utils/addSignedWorkerTokenToService';

interface ILoginSyntheticJwtParams {
  authData: IAuthSlice;
  dispatch: AppDispatch;
  totp?: string;
}

export const loginSyntheticJwt = async ({
  authData,
  dispatch,
  totp,
}: ILoginSyntheticJwtParams) => {
  const service = MultiService.getService();
  const web3ReadService = await MultiService.getWeb3ReadService();

  const syntheticTokenData = await service
    .getAccountingGateway()
    .getSyntheticJwtToken(totp);

  const { jwtToken, workerTokenData } =
    await web3ReadService.upgradeSyntheticJwtToken(
      syntheticTokenData?.jwt_data,
    );

  const signedWorkerToken = workerTokenData?.signedToken;

  addSignedWorkerTokenToService({ service, signedWorkerToken });

  dispatch(
    setAuthData({
      ...authData,
      credentials: jwtToken,
      hasOauthLogin: true,
      workerTokenData,
    }),
  );
};
