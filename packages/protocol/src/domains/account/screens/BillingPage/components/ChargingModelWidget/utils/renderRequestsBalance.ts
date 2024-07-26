import { t } from '@ankr.com/common';

import { intlRoot } from '../const';

const requestsIntlKey = `${intlRoot}.requests-balance`;

export interface IRenderRequestsBalanceParams {
  isApproximate?: boolean;
  isShortened?: boolean;
  prefix?: string;
  requestsBalance: number;
}

export const renderRequestsBalance = ({
  isApproximate,
  isShortened,
  prefix,
  requestsBalance: balance,
}: IRenderRequestsBalanceParams) =>
  t(requestsIntlKey, { balance, isApproximate, isShortened, prefix });
