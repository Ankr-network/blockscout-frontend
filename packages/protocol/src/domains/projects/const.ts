import { Plan, PlanName } from './types';

export const projectsIntlRoot = 'projects';

export const newProjectIntlRoot = `${projectsIntlRoot}.new-project`;

export const plans: Plan[] = [
  {
    name: PlanName.EarlyAdopters,
    title: `${newProjectIntlRoot}.plan-step.early-adopters.name`,
    price: `${newProjectIntlRoot}.plan-step.early-adopters.price`,
    description: `${newProjectIntlRoot}.plan-step.early-adopters.description`,
    USDPrice: '10',
  },
  {
    name: PlanName.Grow,
    title: `${newProjectIntlRoot}.plan-step.grow.name`,
    price: `${newProjectIntlRoot}.plan-step.grow.price`,
    description: `${newProjectIntlRoot}.plan-step.grow.description`,
    USDPrice: '500',
    disabled: true,
  },
];

export enum USDPaymentReason {
  Whitelist = 'whitelist',
}
