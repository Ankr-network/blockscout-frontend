import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { claimBNBRewards } from 'modules/referrals/actions/claimBNBRewards';
import { getClaimableBNBRewards } from 'modules/referrals/actions/getClaimableBNBRewards';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { getPartnerData } from 'modules/referrals/actions/getPartnerData';
import { NOT_PARTNER_CODE } from 'modules/referrals/api/const';
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
  claimLoading: boolean;
  onClaimClick: () => void;
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
  const { loading: isClaimLoading } = useMutation({ type: claimBNBRewards });

  useProviderEffect(() => {
    if (code && code !== NOT_PARTNER_CODE) {
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

  const getClaimRewards = useCallback(() => {
    return () => dispatchRequest(claimBNBRewards(code ?? ''));
  }, [code, dispatchRequest]);

  const data: IStatsData[] | undefined = useMemo(() => {
    return partnerData?.map(partnerItem => {
      const { token } = partnerItem;
      const pendingRewards = !partnerItem.rewards.isNaN()
        ? partnerItem.rewards
        : ZERO;

      return {
        token,
        totalStaked: partnerItem.totalStaked,
        daysLeft: partnerItem.daysLeft,
        apy: getApy(token),
        ankrFees: getAnkrFees(token),
        refBonuses: getRefBonuses(token),
        refPercent: getRefPercent(token),
        pendingRewards,
        pendingRewardsUsd: pendingRewards.multipliedBy(getUsdPrice(token)),
        claimableRewards: getClaimableRewards(token),
        claimableRewardsUsd: getClaimableRewards(token).multipliedBy(
          getUsdPrice(token),
        ),
        claimLoading: isClaimLoading,
        onClaimClick: getClaimRewards(),
      };
    });
  }, [
    getAnkrFees,
    getApy,
    getClaimRewards,
    getClaimableRewards,
    getRefBonuses,
    getRefPercent,
    getUsdPrice,
    isClaimLoading,
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
