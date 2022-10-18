import { Address } from '@ankr.com/provider-core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { getStakersData } from 'modules/referrals/actions/getStakersData';
import { getMetrics } from 'modules/stake/actions/getMetrics';

interface IUseReferralsData {
  registrationDate: Date;
  address: Address;
  stakedToken: Token;
  stakedAmount: BigNumber;
  stakedAmountUsd: BigNumber;
  myRewards: BigNumber;
  myRewardsUsd: BigNumber;
}

interface IUseReferrals {
  isLoading: boolean;
  data?: IUseReferralsData[];
}

interface IUseReferralsProps {
  searchAddress?: string;
}

export const useReferrals = ({
  searchAddress,
}: IUseReferralsProps): IUseReferrals => {
  const dispatchRequest = useDispatchRequest();

  const { data: code, loading: isCodeLoading } = useQuery({
    type: getPartnerCode,
  });
  const { data: stakersData, loading: isBNBDataLoading } = useQuery({
    type: getStakersData,
  });
  const { data: metricsData, loading: isMetricsLoading } = useQuery({
    type: getMetrics,
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
      dispatchRequest(getStakersData(code));
    }
  }, [code]);

  const data: IUseReferralsData[] | undefined = useMemo(() => {
    return stakersData
      ?.filter(referral =>
        searchAddress ? referral.address.includes(searchAddress) : true,
      )
      .map(stakerItem => {
        const token = stakerItem.network;

        return {
          registrationDate: stakerItem.firstStake,
          address: stakerItem.address,
          stakedToken: token,
          stakedAmount: stakerItem.stakedAmount,
          stakedAmountUsd: stakerItem.stakedAmount.multipliedBy(
            getUsdPrice(token as Token),
          ),
          myRewards: stakerItem.rewards,
          myRewardsUsd: stakerItem.rewards.multipliedBy(
            getUsdPrice(token as Token),
          ),
        };
      });
  }, [getUsdPrice, searchAddress, stakersData]);

  return {
    isLoading: isBNBDataLoading || isCodeLoading || isMetricsLoading,
    data,
  };
};
