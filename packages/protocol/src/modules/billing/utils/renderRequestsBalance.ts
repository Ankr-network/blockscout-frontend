import { t } from '@ankr.com/common';

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
  t('balance.requests', { balance, isApproximate, isShortened, prefix });
