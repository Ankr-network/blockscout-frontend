import { NewProjectStep, PlanName } from 'domains/projects/types';
import { NewProjectType } from 'domains/projects/store';
import { plans } from 'domains/projects/const';

type PlanStepFields = NonNullable<NewProjectType[NewProjectStep.Plan]>;

export const getPlanStepFields = (name: PlanName): PlanStepFields => {
  const { name: planName, monthUSDPrice: planPrice } =
    plans.find(plan => plan.name === name) ?? plans[0];

  return { planName, planPrice };
};
