// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import BigNumber from 'bignumber.js';

declare module 'bignumber.js' {
  interface BigNumber extends BigNumber.Instance {
    round(): BigNumber;
  }
}
