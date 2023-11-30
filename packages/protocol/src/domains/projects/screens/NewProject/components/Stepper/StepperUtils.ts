import { t } from '@ankr.com/common';

import { NewProjectStep } from 'domains/projects/types';
import { newProjectIntlRoot } from 'domains/projects/const';

export const getSteps = () => {
  return [
    {
      step: NewProjectStep.General,
      label: t(`${newProjectIntlRoot}.steps.${NewProjectStep.General}`),
    },
    {
      step: NewProjectStep.Chains,
      label: t(`${newProjectIntlRoot}.steps.${NewProjectStep.Chains}`),
    },
    {
      step: NewProjectStep.Whitelist,
      label: t(`${newProjectIntlRoot}.steps.${NewProjectStep.Whitelist}`),
    },
  ];
};
