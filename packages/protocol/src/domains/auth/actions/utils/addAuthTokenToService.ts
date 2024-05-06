import { MultiRpcSdk } from 'multirpc-sdk';

export interface IAddAuthTokenToServiceParams {
  authToken?: string;
  service: MultiRpcSdk;
}

export const addAuthTokenToService = ({
  authToken,
  service,
}: IAddAuthTokenToServiceParams) => {
  if (authToken) {
    service.getAccountingGateway().addToken(authToken);
    service.getEnterpriseGateway().addToken(authToken);
  }
};
