import { UpgradePlanDialogType } from '../types';
import { useBannerQueryParam } from './useBannerQueryParam';
import { useHasPremiumType } from './useHasPremiumType';
import { useHasRegisterType } from './useHasRegisterType';

const { Default } = UpgradePlanDialogType;

export const useTypeFromURL = () => {
  const type = useBannerQueryParam();

  const hasPremiumType = useHasPremiumType(type);
  const hasRegisterType = useHasRegisterType(type);

  return hasPremiumType || hasRegisterType ? type : Default;
};
