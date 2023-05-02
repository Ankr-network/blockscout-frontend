import { useCallback } from 'react';

import { UpgradeHandler, UpgradePlanDialogType } from '../types';
import { trackUpgradePlanModalClick } from 'modules/analytics/mixpanel/trackUpgradePlanModalClick';

export const useUpgradePlanHandler = (
  type: UpgradePlanDialogType,
): UpgradeHandler =>
  useCallback(plan => trackUpgradePlanModalClick({ plan, type }), [type]);
