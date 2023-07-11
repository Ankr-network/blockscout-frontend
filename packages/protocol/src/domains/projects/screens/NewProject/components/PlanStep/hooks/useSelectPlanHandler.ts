import { useCallback } from 'react';
import { useForm } from 'react-final-form';

import { PlanName } from 'domains/projects/types';
import { PlanStepFields } from 'domains/projects/store';
import { getPlanStepFields } from '../utils/getPlanStepFields';

export const useSelectPlanHandler = () => {
  const { change } = useForm();

  return useCallback(
    (name: PlanName) => {
      const { planName, planPrice } = getPlanStepFields(name);

      change(PlanStepFields.planName, planName);
      change(PlanStepFields.planPrice, planPrice);
    },
    [change],
  );
};
