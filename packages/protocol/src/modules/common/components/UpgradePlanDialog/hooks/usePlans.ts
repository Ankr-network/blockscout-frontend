import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { UpgradePlanDialogType } from '../types';
import { plansMap } from '../const';

export const usePlans = (type: UpgradePlanDialogType) => {
  const { hasPremium = false } = useAuth();

  return useMemo(() => plansMap[type][Number(hasPremium)], [hasPremium, type]);
};
