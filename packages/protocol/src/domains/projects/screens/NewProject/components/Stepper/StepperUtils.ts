import { t } from '@ankr.com/common';

import { NewProjectStep } from 'domains/projects/types';
import { newProjectIntlRoot } from 'domains/projects/const';

export const getSteps = () => {
  return [
    {
      step: NewProjectStep.Chain,
      label: t(`${newProjectIntlRoot}.steps.${NewProjectStep.Chain}`),
    },
    {
      step: NewProjectStep.Whitelist,
      label: t(`${newProjectIntlRoot}.steps.${NewProjectStep.Whitelist}`),
    },
    {
      step: NewProjectStep.Plan,
      label: t(`${newProjectIntlRoot}.steps.${NewProjectStep.Plan}`),
    },
    {
      step: NewProjectStep.Checkout,
      label: t(`${newProjectIntlRoot}.steps.${NewProjectStep.Checkout}`),
    },
  ];
};
