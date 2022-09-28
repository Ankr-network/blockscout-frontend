import { useQuery } from '@redux-requests/react';

import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';

interface IUseBridgedETH {
  isBridgedEthBondBscShowed: boolean;
  isBridgedEthCertBscShowed: boolean;
  isBridgedEthCertBSCLoading: boolean;
  isBridgedEthBondBSCLoading: boolean;
}

export const useBridgedETH = (): IUseBridgedETH => {
  const { data: bridgedEthCertBSC, loading: isBridgedEthCertBSCLoading } =
    useQuery({
      type: fetchAETHCBridged,
    });

  const { data: bridgedEthBondBSC, loading: isBridgedEthBondBSCLoading } =
    useQuery({
      type: fetchAETHBBridged,
    });

  const isBridgedEthBondBscShowed = getIsBalancePositive(bridgedEthBondBSC);

  const isBridgedEthCertBscShowed = getIsBalancePositive(bridgedEthCertBSC);

  return {
    isBridgedEthBondBscShowed,
    isBridgedEthCertBscShowed,
    isBridgedEthCertBSCLoading,
    isBridgedEthBondBSCLoading,
  };
};
