import { useCallback } from 'react';

import { PlanID, UpgradeHandler } from '../types';

export type PremiumUpgradeHandlerParams = {
  onUpgrade: (plan: PlanID) => void;
};

export const useFreeUpgradeHandler = (onUpgrade: UpgradeHandler) =>
  useCallback(() => {
    onUpgrade(PlanID.Free);
  }, [onUpgrade]);
