import { PromiEvent, TransactionReceipt } from 'web3-core';

import EventEmitter from 'events';

import { waitForTx } from '../transactions';

describe('modules/common/utils/transactions', () => {
  test('should not wait for tx if there is no receipt promise', async () => {
    const result = await waitForTx({});
    expect(result).toBeUndefined();
  });

  test('should throw an error', async () => {
    const receiptPromise = new EventEmitter();

    const result = waitForTx({
      receiptPromise:
        receiptPromise as unknown as PromiEvent<TransactionReceipt>,
    }).catch((error: string) => error);

    receiptPromise.emit('error', 'error');

    expect(await result).toBe('error');
  });

  test('should wait for tx properly', async () => {
    const receiptPromise = new EventEmitter();

    const result = waitForTx({
      receiptPromise:
        receiptPromise as unknown as PromiEvent<TransactionReceipt>,
      confirmations: 2,
    });

    receiptPromise.emit('confirmation', 1);
    receiptPromise.emit('confirmation', 2);

    expect(await result).toStrictEqual(receiptPromise);
  });
});
