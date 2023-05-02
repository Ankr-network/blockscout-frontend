import { useMemo } from 'react';

import { UpgradePlanDialogType } from '../types';
import { plansMap } from '../const';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const usePlans = (type: UpgradePlanDialogType) => {
  const { hasPremium = false } = useAuth();

  return useMemo(() => plansMap[type][Number(hasPremium)], [hasPremium, type]);
};
