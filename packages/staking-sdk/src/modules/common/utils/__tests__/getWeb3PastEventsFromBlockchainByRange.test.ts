import { Contract } from 'web3-eth-contract';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { getWeb3PastEventsFromBlockchainByRange } from '../getWeb3PastEventsFromBlockchainByRange';

describe('modules/common/utils/getWeb3PastEventsFromBlockchainByRange', () => {
  test('should return data for "getWeb3PastEventsFromBlockchainByRange"', async () => {
    const contract = {
      getPastEvents: async () => [],
    } as unknown as Contract;

    const provider = {} as unknown as Web3KeyReadProvider;

    const data = await getWeb3PastEventsFromBlockchainByRange({
      contract,
      eventName: 'test',
      filter: {},
      latestBlockNumber: 2,
      provider,
      rangeStep: 1,
      startBlock: 1,
    });

    expect(data).toStrictEqual([]);
  });
});
