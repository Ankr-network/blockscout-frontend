import { MultiService } from 'modules/api/MultiService';

export const makeWorkerGatewayAuthorization = async (jwtToken?: string) => {
  const service = MultiService.getService();

  if (jwtToken) {
    service.getWorkerGateway().addJwtToken(jwtToken);
  }
};
