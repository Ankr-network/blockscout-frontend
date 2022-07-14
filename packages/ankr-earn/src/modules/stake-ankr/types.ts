export enum EFieldsNames {
  amount = 'amount',
  provider = 'provider',
  yourRewards = 'yourRewards',
  restakeRewards = 'restakeRewards',
  claimRewards = 'claimRewards',
}

export interface IAnkrStakeSubmitPayload {
  amount: string;
  provider: string;
  yourRewards: string;
  restakeRewards: string;
}
