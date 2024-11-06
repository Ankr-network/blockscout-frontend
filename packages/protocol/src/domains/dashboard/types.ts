import { AccountingGateway, EnterpriseGateway } from 'multirpc-sdk';

export type Gateway = { gateway?: AccountingGateway | EnterpriseGateway };
