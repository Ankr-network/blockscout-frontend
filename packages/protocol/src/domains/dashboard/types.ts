import { AccountingGateway, EnterpriseGateway } from 'multirpc-sdk';

import { FetchPrivateStatsParams } from 'domains/chains/actions/private/fetchPrivateStats';

export type Gateway = { gateway?: AccountingGateway | EnterpriseGateway };

export type ProjectsStatsParams = Pick<
  FetchPrivateStatsParams,
  'group' | 'interval'
> &
  Gateway;
