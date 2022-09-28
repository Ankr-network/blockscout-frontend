import { useQuery } from '@redux-requests/react';

import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { getCommonData as getMaticPolygonCommon } from 'modules/stake-matic/polygon/actions/getCommonData';

interface IUseBridgedMATIC {
  isBridgedMaticBondBscLoading: boolean;
  isBridgedMaticBondBscShowed: boolean;
  isBridgedMaticBondPolygonShowed: boolean;
  isBridgedMaticCertBscLoading: boolean;
  isBridgedMaticCertBscShowed: boolean;
  isMaticPolygonCommonLoading: boolean;
}

export const useBridgedMATIC = (): IUseBridgedMATIC => {
  const { data: maticPolygonCommon, loading: isMaticPolygonCommonLoading } =
    useQuery({
      type: getMaticPolygonCommon,
    });

  const { data: bridgedMaticBondBsc, loading: isBridgedMaticBondBscLoading } =
    useQuery({
      type: fetchAMATICBBridgedBSC,
    });

  const { data: bridgedMaticCertBsc, loading: isBridgedMaticCertBscLoading } =
    useQuery({
      type: fetchAMATICCBridgedBSC,
    });

  const isBridgedMaticBondPolygonShowed = getIsBalancePositive(
    maticPolygonCommon?.maticBondBalance,
  );

  const isBridgedMaticBondBscShowed = getIsBalancePositive(bridgedMaticBondBsc);

  const isBridgedMaticCertBscShowed = getIsBalancePositive(bridgedMaticCertBsc);

  return {
    isBridgedMaticBondBscLoading,
    isBridgedMaticBondBscShowed,
    isBridgedMaticBondPolygonShowed,
    isBridgedMaticCertBscLoading,
    isBridgedMaticCertBscShowed,
    isMaticPolygonCommonLoading,
  };
};
