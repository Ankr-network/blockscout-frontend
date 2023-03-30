import { getUniqueId } from '@ankr.com/common';

export const BridgeCacheTags = {
  common: getUniqueId(),
  notirize: `bridge-notirize-${getUniqueId()}`,
};

export const APPROVE_ACTION_NAME = 'bridge/approve';
export const DEPOSIT_ACTION_NAME = 'bridge/deposit';
export const WITHDRAWAL_ACTION_NAME = 'bridge/withdrawal';
