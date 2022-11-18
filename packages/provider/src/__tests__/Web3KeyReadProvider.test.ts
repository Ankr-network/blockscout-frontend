/**
 * @jest-environment jsdom
 */
import Web3 from 'web3';
import { mockWeb3 } from '../../mocks/batch';
import {
  EthereumHttpWeb3KeyProvider,
  TWeb3BatchCallback,
} from '@ankr.com/provider';

jest.mock('web3', () => jest.fn());

describe('providerManager/Web3KeyReadProvider', () => {
  const createCall =
    (index: number) => (callback: TWeb3BatchCallback<number>) => {
      callback(null, index);

      return index;
    };

  beforeEach(() => {
    (Web3 as unknown as jest.Mock).mockReturnValue(mockWeb3);
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
      .catch((error: Error) => error.message);

    expect(result).toBe('error');
  });
});
