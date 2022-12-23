import { IMySubscriptionsResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const fetchMySubscriptions =
  async (): Promise<IMySubscriptionsResponse> => {
    const service = MultiService.getService();
    const result = await service.getAccountGateway().getMySubscriptions();
    return result;
  };
