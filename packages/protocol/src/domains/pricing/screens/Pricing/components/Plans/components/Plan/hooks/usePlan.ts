import { EGeneralPlanList } from '../../../PlansUtils';
import { useDealConfig } from './useDealConfig';
import { usePAYGConfig } from './usePAYGConfig';
import { useFreeConfig } from './useFreeConfig';

export const usePlan = (planName: EGeneralPlanList) => {
  const dealConfig = useDealConfig();
  const paygConfig = usePAYGConfig();
  const freeConfig = useFreeConfig();

  if (planName === EGeneralPlanList.PayAsYouGo) {
    return paygConfig;
  }

  if (planName === EGeneralPlanList.Deal) {
    return dealConfig;
  }

  return freeConfig;
};
