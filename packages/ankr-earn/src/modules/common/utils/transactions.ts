import { PromiEvent, TransactionReceipt } from 'web3-core';

export interface WaitForTxOptions {
  receiptPromise?: PromiEvent<TransactionReceipt>;
  confirmations?: number;
}

const DEFAULT_CONFIRMATIONS = 1;

export const waitForTx = async ({
  receiptPromise,
  confirmations = DEFAULT_CONFIRMATIONS,
}: WaitForTxOptions): Promise<PromiEvent<TransactionReceipt> | undefined> => {
  if (!receiptPromise) {
    return undefined;
  }

  return new Promise((resolve, reject) =>
    receiptPromise
      .on(
        'confirmation',
        (confirmationNumber: number) =>
          confirmationNumber >= confirmations && resolve(receiptPromise),
      )
      .on('error', (error: Error) => reject(error)),
  );
};
