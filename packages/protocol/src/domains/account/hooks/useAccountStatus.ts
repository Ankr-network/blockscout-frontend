import BigNumber from 'bignumber.js';

import { AccountStatus } from 'multirpc-sdk';

export interface AccountStatusParams {
  balance?: BigNumber;
}

// Temporary solution. Waiting for backend implementation
export const useAccountStatus = ({
  balance,
}: AccountStatusParams): AccountStatus =>
  balance && balance.gt(0) ? AccountStatus.ACTIVE : AccountStatus.INACTIVE;
