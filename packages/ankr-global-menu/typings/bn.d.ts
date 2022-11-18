import BigNumber from 'bignumber.js';

declare module 'bignumber.js' {
  interface BigNumber extends BigNumber.Instance {
    round(): BigNumber;
  }
}
