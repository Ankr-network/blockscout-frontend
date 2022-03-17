import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import { ETH_SCALE_FACTOR, ZERO } from 'modules/common/const';

import { getAPY } from '../getAPY';

describe('modules/stake/api/getAPY', () => {
  const mockWeb3 = {
    eth: {
      getBlockNumber: jest.fn(),
      getBlock: jest.fn(),
    },
  } as unknown as Web3;

  const getTimestamp = (): number => Math.floor(+new Date() / 1000);

  beforeEach(() => {
    (mockWeb3.eth.getBlockNumber as unknown as jest.Mock).mockReturnValue(
      9_000 * 13,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return zero if there is invalid input data', async () => {
    const mockContract = {
      getPastEvents: () => [],
      methods: {
        ratio: () => ({ call: jest.fn() }),
      },
    } as unknown as Contract;

    const result = await getAPY({
      tokenContract: mockContract,
      web3: mockWeb3,
      batchSize: 0,
      blocksDepth: 0,
    });

    expect(result).toStrictEqual(ZERO);
  });

  test('should return zero if there is blockDepth is greater than block number', async () => {
    (mockWeb3.eth.getBlockNumber as unknown as jest.Mock).mockReturnValueOnce(
      6_000,
    );

    const mockContract = {
      getPastEvents: () => [],
      methods: {
        ratio: () => ({ call: jest.fn() }),
      },
    } as unknown as Contract;

    const result = await getAPY({
      tokenContract: mockContract,
      web3: mockWeb3,
    });

    expect(result).toStrictEqual(ZERO);
  });

  test('should return default state if there are no events', async () => {
    const mockContract = {
      getPastEvents: () => [],
      methods: {
        ratio: () => ({ call: jest.fn() }),
      },
    } as unknown as Contract;

    const result = await getAPY({
      tokenContract: mockContract,
      web3: mockWeb3,
    });

    expect(result).toStrictEqual(ZERO);
  });

  test('should return default state if there are no block timestamps', async () => {
    (mockWeb3.eth.getBlock as unknown as jest.Mock)
      .mockReturnValueOnce({})
      .mockReturnValueOnce({});

    const mockContract = {
      getPastEvents: () => [{ blockHash: 'hash1' }, { blockHash: 'hash2' }],
      methods: {
        ratio: () => ({ call: jest.fn() }),
      },
    } as unknown as Contract;

    const result = await getAPY({
      tokenContract: mockContract,
      web3: mockWeb3,
    });

    expect(result).toStrictEqual(ZERO);
  });

  test('should return zero if there is no return values', async () => {
    (mockWeb3.eth.getBlock as unknown as jest.Mock)
      .mockReturnValueOnce({ timestamp: getTimestamp() / 2 })
      .mockReturnValueOnce({ timestamp: getTimestamp() });

    const mockContract = {
      getPastEvents: () => [{ blockHash: 'hash1' }, { blockHash: 'hash2' }],
      methods: {
        ratio: () => ({ call: () => ETH_SCALE_FACTOR / 100 }),
      },
    } as unknown as Contract;

    const result = await getAPY({
      tokenContract: mockContract,
      web3: mockWeb3,
    });

    expect(result).toStrictEqual(ZERO);
  });

  test('should return zero if there is the same timestamp', async () => {
    (mockWeb3.eth.getBlock as unknown as jest.Mock)
      .mockReturnValueOnce({ timestamp: getTimestamp() })
      .mockReturnValueOnce({ timestamp: getTimestamp() });

    const mockContract = {
      getPastEvents: () => [
        { blockHash: 'hash1' },
        { blockHash: 'hash2', returnValues: { newRatio: ETH_SCALE_FACTOR } },
        {
          blockHash: 'hash3',
          returnValues: { newRatio: ETH_SCALE_FACTOR / 1_000 },
        },
        {
          blockHash: 'hash5',
          returnValues: { newRatio: ETH_SCALE_FACTOR / 100 },
        },
      ],
      methods: {
        ratio: () => ({ call: () => ETH_SCALE_FACTOR }),
      },
    } as unknown as Contract;

    const result = await getAPY({
      tokenContract: mockContract,
      web3: mockWeb3,
    });

    expect(result).toStrictEqual(ZERO);
  });

  test('should return apy properly', async () => {
    (mockWeb3.eth.getBlock as unknown as jest.Mock)
      .mockReturnValueOnce({ timestamp: getTimestamp() - 86_400 })
      .mockReturnValueOnce({ timestamp: getTimestamp() - 60 })
      .mockReturnValueOnce({ timestamp: getTimestamp() - 30 })
      .mockReturnValueOnce({ timestamp: getTimestamp() });

    const mockContract = {
      getPastEvents: () => [
        { blockHash: 'hash1' },
        { blockHash: 'hash2', returnValues: { newRatio: ETH_SCALE_FACTOR } },
        {
          blockHash: 'hash3',
          returnValues: { newRatio: ETH_SCALE_FACTOR / 1_000 },
        },
        {
          blockHash: 'hash5',
          returnValues: { newRatio: ETH_SCALE_FACTOR / 100 },
        },
      ],
      methods: {
        ratio: () => ({ call: () => ETH_SCALE_FACTOR }),
      },
    } as unknown as Contract;

    const result = await getAPY({
      tokenContract: mockContract,
      web3: mockWeb3,
    });

    expect(result.toPrecision(3)).toStrictEqual('3.65');
  });
});
