import { useCallback } from 'react';

import { trackUpgradePlanModalClick } from 'modules/analytics/mixpanel/trackUpgradePlanModalClick';

import { UpgradeHandler, UpgradePlanDialogType } from '../types';

export const useUpgradePlanHandler = (
  type: UpgradePlanDialogType,
): UpgradeHandler =>
  useCallback(plan => trackUpgradePlanModalClick({ plan, type }), [type]);
