import { tHTML } from '@ankr.com/common';

import { PlanName, PlanRequestsType } from 'domains/projects/types';
import { newProjectIntlRoot } from 'domains/projects/const';

const planStepIntl = `${newProjectIntlRoot}.plan-step`;

export const getRequestsFromType = (requestsType: PlanRequestsType) =>
  requestsType === PlanRequestsType.Monthly
    ? tHTML(`${planStepIntl}.monthly-requests`)
    : tHTML(`${planStepIntl}.pre-second-requests`);

export const get2ndFeatureByPlanName = (planName: PlanName) =>
  planName === PlanName.Premium
    ? tHTML(`${planStepIntl}.domain`)
    : tHTML(`${planStepIntl}.chains`);

export const get3rdFeatureByPlanName = (planName: PlanName) =>
  planName === PlanName.Premium
    ? tHTML(`${planStepIntl}.contract`)
    : tHTML(`${planStepIntl}.regions`);
