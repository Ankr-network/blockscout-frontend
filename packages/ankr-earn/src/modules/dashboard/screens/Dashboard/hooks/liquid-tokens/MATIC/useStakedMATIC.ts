import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { fetchStats as getMaticEthCommon } from 'modules/stake-matic/eth/actions/fetchStats';
import { getCommonData as getMaticPolygonCommon } from 'modules/stake-matic/polygon/actions/getCommonData';

interface IUseStakedMATIC {
  isStakedMaticCertPolygonShowed: boolean;
  isStakedMaticBondEthereumShowed: boolean;
  isStakedMaticCertEthereumShowed: boolean;
  isMaticPolygonCommonLoading: boolean;
  isMaticEthCommonLoading: boolean;
}

export const useStakedMATIC = (): IUseStakedMATIC => {
  const { data: maticPolygonCommon, loading: isMaticPolygonCommonLoading } =
    useQuery({
      type: getMaticPolygonCommon,
    });

  const { data: maticEthCommon, loading: isMaticEthCommonLoading } = useQuery({
    type: getMaticEthCommon,
  });

  const isStakedMaticCertPolygonShowed = getIsBalancePositive(
    maticPolygonCommon?.maticCertBalance,
  );

  const isStakedMaticBondEthereumShowed =
    getIsBalancePositive(maticEthCommon?.aMATICbBalance) ||
    getIsBalancePositive(maticEthCommon?.pendingBond);

  const isStakedMaticCertEthereumShowed =
    getIsBalancePositive(maticEthCommon?.aMATICcBalance) ||
    getIsBalancePositive(maticEthCommon?.pendingCertificate);

  return {
    isStakedMaticCertPolygonShowed,
    isStakedMaticBondEthereumShowed,
    isStakedMaticCertEthereumShowed,
    isMaticPolygonCommonLoading,
    isMaticEthCommonLoading,
  };
};
