import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { selectAuthData } from '../store/authSlice';
import { selectUserGroupJwtBySelectedGroupAddress } from 'domains/userGroup/store';

export const authorizationGuard = async (getState: GetState) => {
  const authData = selectAuthData(getState());

  const { authorizationToken, workerTokenData } = authData;

  const selectedGroupJwt = selectUserGroupJwtBySelectedGroupAddress(getState());

  const web3ReadService = await MultiService.getWeb3ReadService();
  const service = MultiService.getService();

  if (authorizationToken) {
    service.getAccountGateway().addToken(authorizationToken);
    web3ReadService.getOauthGateway().addToken(authorizationToken);
  }

  if (workerTokenData?.signedToken && !selectedGroupJwt?.jwtData) {
    service.getWorkerGateway().addJwtToken(workerTokenData?.signedToken);
  }

  if (selectedGroupJwt?.jwtData) {
    service.getWorkerGateway().addJwtToken(selectedGroupJwt.jwtData);
  }
};
