import { ICountersEntity } from 'multirpc-sdk';

import { ClientType } from 'stores/useClients/types';

export type PremiumPlanClientEntity = ICountersEntity & {
  type: ClientType;
};
