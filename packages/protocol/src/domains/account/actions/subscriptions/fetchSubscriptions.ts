import { ISubscriptionsResponse, IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const fetchSubscriptions = async (
  params: IApiUserGroupParams,
): Promise<ISubscriptionsResponse> => {
  const service = MultiService.getService();
  const result = await service.getAccountGateway().getSubscriptions(params);

  return result;
};
