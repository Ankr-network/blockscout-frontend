import BigNumber from 'bignumber.js';

interface IHistoryData {
  isLoading: boolean;
  data: {
    date: Date;
    hash: string;
    link: string;
    event: string;
    amount: BigNumber;
  }[];
}

export const useHistoryData = (): IHistoryData => {
  return {
    isLoading: false,
    data: [
      {
        date: new Date(11, 11, 2022),
        hash: '0xpaa132dasda0psdoaspod913',
        link: 'link 1',
        event: 'Stake',
        amount: new BigNumber(4192),
      },
      {
        date: new Date(9, 9, 2022),
        hash: '0xdasja132dasda03dsdadlk',
        link: 'link 2',
        event: 'Unstake',
        amount: new BigNumber(92),
      },
      {
        date: new Date(1, 1, 2022),
        hash: '0x0adsoa132dasda0ipadskadmads',
        link: 'link 3',
        event: 'Restake',
        amount: new BigNumber(2),
      },
      {
        date: new Date(3, 3, 2022),
        hash: '0x0sa011a132dasda0l23hj23asd',
        link: 'link 4',
        event: 'Claim rewards',
        amount: new BigNumber(2),
      },
      {
        date: new Date(2, 2, 2022),
        hash: '0x0asda132dasda098ads9das90a',
        link: 'link 5',
        event: 'Claim principal',
        amount: new BigNumber(89),
      },
    ],
  };
};
