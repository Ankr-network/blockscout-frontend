import BigNumber from 'bignumber.js';

interface IUnstakeRow {
  unstakeAmount: BigNumber;
  usdUnstakeAmount: BigNumber;
  claimLink: string;
  daysLeft?: number;
}

interface IUnstakeData {
  isLoading: boolean;
  data: IUnstakeRow[];
}

const DEMO_DATA = [
  {
    unstakeAmount: new BigNumber(12213123.13),
    usdUnstakeAmount: new BigNumber(2132),
    claimLink: '',
    daysLeft: 7,
  },
  {
    unstakeAmount: new BigNumber(4),
    usdUnstakeAmount: new BigNumber(3),
    claimLink: 'claimLink',
  },
  {
    unstakeAmount: new BigNumber(4),
    usdUnstakeAmount: new BigNumber(3),
    claimLink: '',
  },
];

export const useUnstakeData = (): IUnstakeData => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
