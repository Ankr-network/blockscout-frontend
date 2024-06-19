import { t } from '@ankr.com/common';

export interface IRenderRequestsAmountParams {
  isApproximate?: boolean;
  requests: number;
}

export const renderRequestsAmount = ({
  isApproximate,
  requests,
}: IRenderRequestsAmountParams) =>
  t('account.amounts.requests', { isApproximate, requests });
