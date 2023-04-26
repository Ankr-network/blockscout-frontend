import { UpgradePlanDialogType } from '../types';

export const isRegisterType = (type?: UpgradePlanDialogType) =>
  type === UpgradePlanDialogType.Register;
