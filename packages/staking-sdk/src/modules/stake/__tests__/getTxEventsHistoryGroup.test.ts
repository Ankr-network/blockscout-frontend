import Web3 from 'web3';

import { ZERO_ADDRESS } from '../../common';
import { getTxEventsHistoryGroup } from '../getTxEventsHistoryGroup';

describe('modules/stake/getTxEventsHistoryGroup', () => {
  test('should return empty history group', async () => {
    const result = await getTxEventsHistoryGroup({
      rawEvents: [],
      web3: {} as Web3,
    });

    expect(result).toHaveLength(0);
  });

  test('should return history group', async () => {
    const mockWeb3 = {
      eth: { getBlock: () => ({ timestamp: 1 }) },
      utils: { fromWei: (value: string) => value },
    } as unknown as Web3;

    const result = await getTxEventsHistoryGroup({
      rawEvents: [
        {
          returnValues: { amount: '1' },
          raw: { data: '', topics: [] },
          event: 'event1',
          signature: 'signature',
          logIndex: 0,
          transactionIndex: 0,
          transactionHash: 'hash1',
          blockHash: 'blockHash',
          blockNumber: 1,
          address: ZERO_ADDRESS,
        },
        {
          returnValues: { amount: '2' },
          raw: { data: '', topics: [] },
          event: 'event2',
          signature: 'signature',
          logIndex: 0,
          transactionIndex: 0,
          transactionHash: 'hash2',
          blockHash: 'blockHash',
          blockNumber: 1,
          address: ZERO_ADDRESS,
        },
      ],
      web3: mockWeb3,
    });

    expect(result).toHaveLength(2);
  });
});
