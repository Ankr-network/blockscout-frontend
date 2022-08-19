import BigNumber from 'bignumber.js';

export interface IMgnoFormState {
  amount?: BigNumber;
}

export interface IMgnoStakeSubmitPayload {
  amount: string;
  provider: string;
}
