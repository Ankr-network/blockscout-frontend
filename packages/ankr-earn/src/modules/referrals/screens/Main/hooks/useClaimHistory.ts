import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getClaimHistory as getBNBClaimHistory } from 'modules/referrals/actions/getClaimHistory';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { getMetrics } from 'modules/stake/actions/getMetrics';

interface IUseClaimHistoryData {
  date: Date;
  amount: BigNumber;
  amountUsd: BigNumber;
  token: Token;
}

interface ITotalClaimedData {
  amount: BigNumber;
  amountUsd: BigNumber;
  token: Token;
}

interface IUseClaimHistory {
  isLoading: boolean;
  data?: IUseClaimHistoryData[];
  totalClaimed?: ITotalClaimedData[];
}

export const useClaimHistory = (): IUseClaimHistory => {
  const dispatchRequest = useDispatchRequest();

  const { data: code, loading: isCodeLoading } = useQuery({
    type: getPartnerCode,
  });
  const { data: metricsData, loading: isMetricsLoading } = useQuery({
    type: getMetrics,
  });
  const { data: bnbClaimHistoryData, loading: isBNBClaimHistoryDataLoading } =
    useQuery({
      type: getBNBClaimHistory,
    });

  const getUsdPrice = useCallback(
    (token: Token) => {
      if (!metricsData) return ZERO;

      switch (token) {
        case Token.ETH:
          return metricsData.eth.totalStakedUsd.dividedBy(
            metricsData.eth.totalStaked,
          );
        case Token.MATIC:
          return metricsData.matic.totalStakedUsd.dividedBy(
            metricsData.matic.totalStaked,
          );
        case Token.AVAX:
          return metricsData.avax.totalStakedUsd.dividedBy(
            metricsData.avax.totalStaked,
          );
        case Token.BNB:
          return metricsData.bnb.totalStakedUsd.dividedBy(
            metricsData.bnb.totalStaked,
          );
        case Token.FTM:
          return metricsData.ftm.totalStakedUsd.dividedBy(
            metricsData.ftm.totalStaked,
          );
        case Token.DOT:
          return metricsData.dot.totalStakedUsd.dividedBy(
            metricsData.dot.totalStaked,
          );
        case Token.KSM:
          return metricsData.ksm.totalStakedUsd.dividedBy(
            metricsData.ksm.totalStaked,
          );
        default:
          return ZERO;
      }
    },
    [metricsData],
  );

  useProviderEffect(() => {
    if (code) {
      dispatchRequest(getBNBClaimHistory(code));
    }
  }, [code]);

  const data: IUseClaimHistoryData[] | undefined = useMemo(() => {
    return bnbClaimHistoryData?.map(historyItem => ({
      date: historyItem.date,
      amount: historyItem.amount,
      amountUsd: historyItem.amount.multipliedBy(getUsdPrice(Token.BNB)),
      token: Token.BNB,
    }));
  }, [getUsdPrice, bnbClaimHistoryData]);

  const totalClaimed: ITotalClaimedData[] | undefined = useMemo(() => {
    if (!bnbClaimHistoryData) return undefined;

    const bnbTotalClaimed = bnbClaimHistoryData.reduce(
      (acc, historyData) => acc.plus(historyData.amount),
      ZERO,
    );
    const bnbTotalClaimedUsd = bnbTotalClaimed.multipliedBy(
      getUsdPrice(Token.BNB),
    );

    return [
      {
        amount: bnbTotalClaimed,
        amountUsd: bnbTotalClaimedUsd,
        token: Token.BNB,
      },
    ];
  }, [getUsdPrice, bnbClaimHistoryData]);

  return {
    isLoading:
      isBNBClaimHistoryDataLoading || isCodeLoading || isMetricsLoading,
    data,
    totalClaimed,
  };
};
