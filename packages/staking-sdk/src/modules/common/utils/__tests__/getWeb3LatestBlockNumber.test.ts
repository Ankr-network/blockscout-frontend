import { Web3KeyReadProvider } from '@ankr.com/provider';

import { getWeb3LatestBlockNumber } from '../getWeb3LatestBlockNumber';

describe('modules/common/utils/getWeb3LatestBlockNumber', () => {
  test('should return data for "getWeb3LatestBlockNumber"', async () => {
    const value = 1;

    const provider = {
      getWeb3: () => ({
        eth: {
          getBlockNumber: async () => value,
        },
      }),
    } as unknown as Web3KeyReadProvider;

    const data = await getWeb3LatestBlockNumber({ provider });

    expect(data).toBe(value);
  });
});
