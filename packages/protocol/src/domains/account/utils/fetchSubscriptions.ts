import { ISubscriptionsResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const fetchSubscriptions = async (): Promise<ISubscriptionsResponse> => {
  const service = MultiService.getService();
  const result = await service.getAccountGateway().getSubscriptions();
  return result;
};
