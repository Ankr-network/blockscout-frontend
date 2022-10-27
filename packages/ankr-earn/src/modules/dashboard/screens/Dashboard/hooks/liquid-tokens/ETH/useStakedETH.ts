import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { getClaimableData } from 'modules/stake-eth/actions/getClaimableData';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';

interface IUseStakedETH {
  isStakedEthBondShowed: boolean;
  isStakedEthCertShowed: boolean;
  isEthCommonLoading: boolean;
  isUnclaimedEthBondShowed: boolean;
}

export const useStakedETH = (): IUseStakedETH => {
  const { data: ethCommon, loading: isEthCommonLoading } = useQuery({
    type: getCommonData,
  });
  const { data: ethClaimable, loading: isEthClaimableLoading } = useQuery({
    type: getClaimableData,
  });

  const isStakedEthBondShowed = getIsBalancePositive(ethCommon?.aETHbBalance);

  const isStakedEthCertShowed = getIsBalancePositive(ethCommon?.aETHcBalance);

  const isUnclaimedEthBondShowed = getIsBalancePositive(
    ethClaimable?.claimableAETHB,
  );

  return {
    isStakedEthBondShowed,
    isStakedEthCertShowed,
    isEthCommonLoading: isEthCommonLoading || isEthClaimableLoading,
    isUnclaimedEthBondShowed,
  };
};
