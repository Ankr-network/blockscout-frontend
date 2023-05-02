import { UpgradePlanDialogType } from '../types';

export const isPremiumType = (type?: UpgradePlanDialogType) =>
  type === UpgradePlanDialogType.Premium;
