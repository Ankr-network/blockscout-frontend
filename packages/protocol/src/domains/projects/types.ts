export enum NewProjectStep {
  Chain,
  Whitelist,
  Plan,
  Checkout,
}

export enum PlanName {
  EarlyAdopters = 'Early Adopters',
  Grow = 'Grow',
}

export interface Plan {
  name: PlanName;
  title: string;
  price: string;
  description: string;
  USDPrice: string;
  disabled?: boolean;
}
