import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getClaimableBNBRewards } from 'modules/referrals/actions/getClaimableBNBRewards';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { getPartnerData } from 'modules/referrals/actions/getPartnerData';
import { getMetrics } from 'modules/stake/actions/getMetrics';

interface IStatsData {
  token: Token;
  totalStaked: BigNumber;
  refPercent: BigNumber;
  apy: BigNumber;
  ankrFees: number;
  refBonuses: number;
  daysLeft: number;
  pendingRewards: BigNumber;
  pendingRewardsUsd: BigNumber;
  claimableRewards: BigNumber;
  claimableRewardsUsd: BigNumber;
}

interface IStats {
  isLoading: boolean;
  data?: IStatsData[];
}

const BNB_ANKR_FEES = 10;
const DEFAULT_ANKR_FEES = 0;

const BNB_ANKR_BONUSES = 70;
const DEFAULT_ANKR_BONUSES = 0;

const BNB_REF_PERCENT = new BigNumber(0.07);
const DEFAULT_REF_PERCENT = ZERO;

export const useStatsData = (): IStats => {
  const dispatchRequest = useDispatchRequest();

  const { data: code, loading: isCodeLoading } = useQuery({
    type: getPartnerCode,
  });
  const { data: partnerData, loading: isBNBDataLoading } = useQuery({
    type: getPartnerData,
  });
  const { data: metricsData, loading: isMetricsLoading } = useQuery({
    type: getMetrics,
  });
  const { data: bnbClaimableRewards, loading: isBNBClaimableRewardsLoading } =
    useQuery({ type: getClaimableBNBRewards });

  useProviderEffect(() => {
    if (code) {
      dispatchRequest(getPartnerData(code));
      dispatchRequest(getClaimableBNBRewards(code));
    }
  }, [code]);

  const getApy = useCallback(
    (token: Token) => {
      if (!metricsData) return ZERO;

      switch (token) {
        case Token.ETH:
          return metricsData.eth.apy;
        case Token.MATIC:
          return metricsData.matic.apy;
        case Token.AVAX:
          return metricsData.avax.apy;
        case Token.BNB:
          return metricsData.bnb.apy;
        case Token.FTM:
          return metricsData.ftm.apy;
        case Token.DOT:
          return metricsData.dot.apy;
        case Token.KSM:
          return metricsData.ksm.apy;
        default:
          return ZERO;
      }
    },
    [metricsData],
  );

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

  const getClaimableRewards = useCallback(
    (token: Token) => {
      switch (token) {
        case Token.BNB:
          return bnbClaimableRewards ?? ZERO;
        default:
          return ZERO;
      }
    },
    [bnbClaimableRewards],
  );

  const getAnkrFees = useCallback((token: Token) => {
    switch (token) {
      case Token.BNB:
        return BNB_ANKR_FEES;
      default:
        return DEFAULT_ANKR_FEES;
    }
  }, []);

  const getRefBonuses = useCallback((token: Token) => {
    switch (token) {
      case Token.BNB:
        return BNB_ANKR_BONUSES;
      default:
        return DEFAULT_ANKR_BONUSES;
    }
  }, []);

  const getRefPercent = useCallback((token: Token) => {
    switch (token) {
      case Token.BNB:
        return BNB_REF_PERCENT;
      default:
        return DEFAULT_REF_PERCENT;
    }
  }, []);

  const data: IStatsData[] | undefined = useMemo(() => {
    return partnerData?.map(partnerItem => {
      const { token } = partnerItem;

      return {
        token,
        totalStaked: partnerItem.totalStaked,
        daysLeft: partnerItem.daysLeft,
        apy: getApy(token),
        ankrFees: getAnkrFees(token),
        refBonuses: getRefBonuses(token),
        refPercent: getRefPercent(token),
        pendingRewards: partnerItem.rewards,
        pendingRewardsUsd: partnerItem.rewards.multipliedBy(getUsdPrice(token)),
        claimableRewards: getClaimableRewards(token),
        claimableRewardsUsd: getClaimableRewards(token).multipliedBy(
          getUsdPrice(token),
        ),
      };
    });
  }, [
    getAnkrFees,
    getApy,
    getClaimableRewards,
    getRefBonuses,
    getRefPercent,
    getUsdPrice,
    partnerData,
  ]);

  return {
    isLoading:
      isBNBDataLoading ||
      isCodeLoading ||
      isMetricsLoading ||
      isBNBClaimableRewardsLoading,
    data,
  };
};
