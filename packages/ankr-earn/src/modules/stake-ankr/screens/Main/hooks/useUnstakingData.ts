import BigNumber from 'bignumber.js';

interface IUnstakingData {
  isLoading: boolean;
  data: {
    provider: string;
    unstakeAmount: BigNumber;
    usdUnstakeAmount: BigNumber;
    claimLink: string;
    daysLeft?: number;
  }[];
}

export const useUnstakingData = (): IUnstakingData => {
  return {
    isLoading: false,
    data: [
      {
        provider: 'Provider 1',
        unstakeAmount: new BigNumber(12213123.13),
        usdUnstakeAmount: new BigNumber(2132),
        claimLink: '',
        daysLeft: 7,
      },
      {
        provider: 'Provider 2',
        unstakeAmount: new BigNumber(4),
        usdUnstakeAmount: new BigNumber(3),
        claimLink: 'claimLink',
      },
      {
        provider: 'Provider 3',
        unstakeAmount: new BigNumber(4),
        usdUnstakeAmount: new BigNumber(3),
        claimLink: '',
      },
    ],
  };
};
