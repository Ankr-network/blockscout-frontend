import { Plan, PlanName, PlanSupportType, PlanRequestsType } from './types';

export const projectsIntlRoot = 'projects';

export const newProjectIntlRoot = `${projectsIntlRoot}.new-project`;

export const plans: Plan[] = [
  {
    monthUSDPrice: '500',
    name: PlanName.Premium,
    requestsType: PlanRequestsType.Monthly,
    support: PlanSupportType.Portal,
    title: `${newProjectIntlRoot}.plan-step.premium-plan.name`,
  },
  {
    disabled: true,
    monthUSDPrice: '500',
    name: PlanName.Enterprise,
    requestsType: PlanRequestsType.PerMonth,
    support: PlanSupportType.EngineeringTeam,
    title: `${newProjectIntlRoot}.plan-step.enterprise-plan.name`,
  },
];

export enum USDPaymentReason {
  Whitelist = 'whitelist',
}
