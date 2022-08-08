import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect, useMemo, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getAllClaimableUnstakes } from 'modules/stake-ankr/actions/getAllClaimableUnstakes';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getUnstakingData } from 'modules/stake-ankr/actions/getUnstakingData';
import {
  IClaimableUnstake,
  IUnstakingData,
} from 'modules/stake-ankr/api/AnkrStakingSDK/types';

interface IUseTotalInfo {
  data: IClaimableUnstake[];
  loading: boolean;
  unstakingData: IUnstakingData[] | null;
  newUnstakingAmount: number;
  currentTab: string;
  activeStakingText: string;
  unstakingText: string;
  historyText: string;
  handleChangeTab: (newTab: string) => void;
}

export const useStakingInfo = (): IUseTotalInfo => {
  const dispatchRequest = useDispatchRequest();
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });
  const { data, loading } = useQuery({
    type: getAllClaimableUnstakes,
  });
  const { data: unstakingData } = useQuery({
    type: getUnstakingData,
  });

  const activeStakingText = t('stake-ankr.tabs.active-staking');
  const unstakingText = t('stake-ankr.tabs.unstaking');
  const historyText = t('stake-ankr.tabs.history');

  const [newUnstakingAmount, setUnstakingAmount] = useState(
    unstakingData?.length ?? 0,
  );
  const [currentTab, setCurrentTab] = useState<string>(activeStakingText);

  const handleChangeTab = (newTab: string) => setCurrentTab(newTab);

  const preparedData = useMemo(
    () => data?.filter(unstake => !unstake.amount.isZero()) ?? [],
    [data],
  );

  useProviderEffect(() => {
    dispatchRequest(getAllClaimableUnstakes());
    dispatchRequest(
      getUnstakingData({
        usdPrice: ankrPrice ?? ZERO,
      }),
    );
    setUnstakingAmount(data?.length ?? 0);
  }, [dispatchRequest]);

  useEffect(() => {
    setUnstakingAmount(unstakingData?.length ?? 0);
  }, [unstakingData]);

  return {
    data: preparedData,
    loading,
    unstakingData,
    currentTab,
    newUnstakingAmount,
    activeStakingText,
    unstakingText,
    historyText,
    handleChangeTab,
  };
};
