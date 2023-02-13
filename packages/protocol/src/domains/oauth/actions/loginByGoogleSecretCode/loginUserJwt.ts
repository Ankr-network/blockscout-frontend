import { AppDispatch } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { IAuthSlice, setAuthData } from 'domains/auth/store/authSlice';

export const loginUserJwt = async (
  dispatch: AppDispatch,
  authData: IAuthSlice,
) => {
  const web3ReadService = await MultiService.getWeb3ReadService();

  const jwtToken = await web3ReadService.getIssuedJwtToken(
    authData?.address as string,
  );

  dispatch(
    setAuthData({
      ...authData,
      credentials: jwtToken,
      hasOauthLogin: true,
    }),
  );
};
