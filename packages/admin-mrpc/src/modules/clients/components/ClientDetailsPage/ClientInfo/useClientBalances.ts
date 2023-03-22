import { formatNumber, renderUSD } from 'modules/common/utils/renderBalance';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { NOT_FOUND_TEXT } from '../const';

interface UseClientBalancesProps {
  totalData?: IGetUserTotalMapped;
  client: ClientMapped;
}

export const useClientBalances = ({
  totalData,
  client,
}: UseClientBalancesProps) => {
  const statsFromText = totalData?.startedDate
    ? `from ${totalData.startedDate.toLocaleString()}`
    : undefined;
  const totalRequestsText =
    formatNumber(totalData?.blockchainsInfo?.totalCount) || NOT_FOUND_TEXT;
  const totalCostText = Number(totalData?.blockchainsInfo?.totalCost)
    ? `${formatNumber(totalData?.blockchainsInfo.totalCost)}`
    : NOT_FOUND_TEXT;
  const amountUsdText = client?.amountUsd
    ? `${renderUSD(client?.amountUsd)} Equivalent in USD`
    : null;
  const voucherExpiresAtText = `expires at ${client?.voucherExpiresDate?.toLocaleDateString()}`;

  return {
    statsFromText,
    totalRequestsText,
    totalCostText,
    amountUsdText,
    voucherExpiresAtText,
  };
};
