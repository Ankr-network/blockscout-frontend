import * as Web3 from 'web3';

import { TWeb3BatchCallback } from '../providerManager/Web3KeyReadProvider';
import { EthereumHttpWeb3KeyProvider } from '../providerManager/providers/EthereumHttpWeb3KeyProvider';
import { mockWeb3 } from '../mocks/batch';

jest.mock('web3', () => ({
  default: jest.fn(),
}));

describe('providerManager/Web3KeyReadProvider', () => {
  const createCall =
    (index: number) => (callback: TWeb3BatchCallback<number>) => {
      callback(null, index);

      return index;
    };

  beforeEach(() => {
    (Web3.default as unknown as jest.Mock).mockReturnValue(mockWeb3);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should resolve batch requests properly', async () => {
    const provider = new EthereumHttpWeb3KeyProvider('url');
    const calls = [createCall(1), createCall(2), createCall(3)];

    const result = await provider.executeBatchCalls(calls);

    expect(result).toStrictEqual([1, 2, 3]);
  });

  test('should reject batch requests properly', async () => {
    const provider = new EthereumHttpWeb3KeyProvider('url');

    const calls = [
      createCall(1),
      createCall(2),
      createCall(3),
      (callback: TWeb3BatchCallback<number>) => {
        callback(new Error('error'), 4);

        return 4;
      },
    ];

    const result = await provider
      .executeBatchCalls(calls)
      .catch(error => error.message);

    expect(result).toBe('error');
  });
});
