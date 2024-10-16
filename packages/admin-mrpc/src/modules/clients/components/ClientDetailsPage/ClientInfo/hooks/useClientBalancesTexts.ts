import { formatNumber, renderUSD } from 'modules/common/utils/renderBalance';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';

import { NOT_FOUND_TEXT } from '../../const';
import { ClientBalancesMapped } from '../../../../types';

interface UseClientBalancesProps {
  totalData?: IGetUserTotalMapped;
  clientBalances?: ClientBalancesMapped;
}

export const useClientBalancesTexts = ({
  totalData,
  clientBalances,
}: UseClientBalancesProps) => {
  const statsFromText = totalData?.startedDate
    ? `from ${totalData.startedDate.toLocaleString()}`
    : undefined;
  const totalRequestsText =
    formatNumber(totalData?.blockchainsInfo?.totalCount) || NOT_FOUND_TEXT;
  const totalCostText = Number(totalData?.blockchainsInfo?.totalCost)
    ? `${formatNumber(totalData?.blockchainsInfo.totalCost)}`
    : NOT_FOUND_TEXT;
  const amountUsdText = clientBalances?.amountUsd
    ? `${renderUSD(clientBalances?.amountUsd)} Equivalent in USD`
    : null;
  const voucherExpiresAtText = `expires at ${clientBalances?.voucherExpiresDate?.toLocaleDateString()}`;

  return {
    statsFromText,
    totalRequestsText,
    totalCostText,
    amountUsdText,
    voucherExpiresAtText,
  };
};
