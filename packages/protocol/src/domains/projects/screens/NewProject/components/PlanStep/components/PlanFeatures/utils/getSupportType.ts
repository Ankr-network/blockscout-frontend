import { t } from '@ankr.com/common';

import { newProjectIntlRoot } from 'domains/projects/const';
import { PlanSupportType } from 'domains/projects/types';

const supportMap: Record<PlanSupportType, string> = {
  [PlanSupportType.EngineeringTeam]: `${newProjectIntlRoot}.plan-step.support-type.engineering-team`,
  [PlanSupportType.Portal]: `${newProjectIntlRoot}.plan-step.support-type.portal`,
};

export const getSupportType = (type: PlanSupportType) => t(supportMap[type]);
