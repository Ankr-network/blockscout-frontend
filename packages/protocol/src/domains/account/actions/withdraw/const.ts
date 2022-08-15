export enum WithdrawStep {
  start,
  withdraw,
  waitTransactionConfirming,
  done,
}

export const MIN_AMOUNT = 500;

export const ETH_BLOCK_TIME = 10_000;
