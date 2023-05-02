import { useCallback } from 'react';

import { PlanID, UpgradeHandler } from '../types';

export interface EnterpiseUpgradeHandlerParams {
  onUpgrade: UpgradeHandler;
  setContactSales: () => void;
}

export const useEnterpriseUpgradeHandler = ({
  onUpgrade,
  setContactSales,
}: EnterpiseUpgradeHandlerParams) =>
  useCallback(() => {
    onUpgrade(PlanID.Enterprise);

    setContactSales();
  }, [setContactSales, onUpgrade]);
