import { MultiRpcSdk } from 'multirpc-sdk';

export interface IAddSignedWorkerTokenToServiceParams {
  service: MultiRpcSdk;
  signedWorkerToken?: string;
}

export const addSignedWorkerTokenToService = ({
  service,
  signedWorkerToken,
}: IAddSignedWorkerTokenToServiceParams) => {
  if (signedWorkerToken) {
    service.getWorkerGateway().addJwtToken(signedWorkerToken);
  }
};
