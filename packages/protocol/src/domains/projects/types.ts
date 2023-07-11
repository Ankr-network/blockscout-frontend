export enum NewProjectStep {
  Chain,
  Whitelist,
  Plan,
  Checkout,
}

export enum PlanName {
  Enterprise = 'enterprise',
  Premium = 'premium',
}

export enum PlanSupportType {
  EngineeringTeam,
  Portal,
}

export enum PlanRequestsType {
  Monthly = 'monthly',
  PerMonth = 'per-month',
}

export interface Plan {
  disabled?: boolean;
  monthUSDPrice: string;
  name: PlanName;
  requestsType: PlanRequestsType;
  support: PlanSupportType;
  title: string;
}
