import BigNumber from 'bignumber.js';

export interface IStakeSubmitPayload {
  amount: string;
  provider: string;
  yourRewards: string;
  restakeRewards: string;
}

export interface IFormState {
  amount?: BigNumber;
}

export enum EFieldsNames {
  amount = 'amount',
  provider = 'provider',
  yourRewards = 'yourRewards',
  restakeRewards = 'restakeRewards',
  claimRewards = 'claimRewards',
}
