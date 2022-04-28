import BigNumber from 'bignumber.js';

import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { MAX_UINT256, ZERO, ZERO_ADDR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { EthSDK, TEthToken } from '..';
import { ETH_POOL_START_BLOCK } from '../const';

jest.mock('modules/api/ProviderManagerSingleton', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
}));

describe('ankr-earn/src/modules/api/EthSDK', () => {
  const ethAmount = '8';
  const timestamp = Math.floor(+new Date() / 1000);

  const mockWeb3 = {
    utils: {
      fromWei: () => ethAmount,
    },

    eth: {
      getChainId: () => 1,

      getBalance: () =>
        new BigNumber(ethAmount).multipliedBy(10 ** 18).toFixed(),

      getBlock: () => Promise.resolve({ timestamp, transactionHash: 'hash1' }),

      getBlockNumber: () => Promise.resolve(ETH_POOL_START_BLOCK + 10_000),

      getTransaction: (txHash: string) =>
        Promise.resolve({
          from: '0xe64FCf6327bB016955EFd36e75a852085270c374',
          transactionIndex: null,
          input:
            '0x6482a22f00000000000000000000000000000000000000000000000075d94a0ed823c000',
          value: txHash === 'txHash' ? '0' : '8000000000000000000',
        }),

      getTransactionReceipt: () => Promise.resolve({ status: true }),

      abi: {
        decodeParameters: () => ({
          0: new BigNumber(ethAmount).multipliedBy(10 ** 18),
        }),
      },
    },
  };

  const defaultContract = {
    getPastEvents: jest.fn(),
    methods: {
      balanceOf: jest.fn(),
      ratio: jest.fn(),
      allowance: jest.fn(),
      claimableAETHFRewardOf: jest.fn(),
      claimableAETHRewardOf: jest.fn(),
      approve: jest.fn(),
      lockShares: jest.fn(),
      unlockShares: jest.fn(),
      stakeAndClaimAethC: jest.fn(),
      stakeAndClaimAethB: jest.fn(),
      claimFETH: jest.fn(),
      claimAETH: jest.fn(),
      REQUESTER_MINIMUM_POOL_STAKING: jest.fn(),
    },
  };

  const defaultProvider = {
    currentAccount: ZERO_ADDR,
    getWeb3: jest.fn(),
    isConnected: jest.fn(),
    connect: jest.fn(),
    sendTransactionAsync: jest.fn(),
    addTokenToWallet: jest.fn(),
    createContract: jest.fn(),
    getContractMethodFee: jest.fn(),
  };

  beforeEach(() => {
    const mockProviderManager = {
      getETHWriteProvider: () => defaultProvider,
      getETHReadProvider: () => defaultProvider,
    };

    defaultContract.methods.lockShares.mockReturnValue({
      encodeABI: () => 'mock-abi',
    });

    defaultContract.methods.approve.mockReturnValue({
      encodeABI: () => 'mock-abi',
    });

    defaultContract.methods.lockShares.mockReturnValue({
      encodeABI: () => 'mock-abi',
    });

    defaultContract.methods.unlockShares.mockReturnValue({
      encodeABI: () => 'mock-abi',
    });

    defaultContract.methods.allowance.mockReturnValue({
      call: () => Promise.resolve(0),
    });

    defaultContract.methods.ratio.mockReturnValue({
      call: () => Promise.resolve(0),
    });

    defaultContract.methods.balanceOf.mockReturnValue({
      call: () => Promise.resolve(1),
    });

    defaultContract.methods.claimableAETHFRewardOf.mockReturnValue({
      call: () => Promise.resolve(ZERO),
    });

    defaultContract.methods.claimableAETHRewardOf.mockReturnValue({
      call: () => Promise.resolve(ZERO),
    });

    defaultContract.methods.stakeAndClaimAethC.mockReturnValue({
      estimateGas: () => Promise.resolve(ZERO),
      send: () =>
        Promise.resolve({
          receiptPromise: {},
          transactionHash: 'hash1',
        }),
    });

    defaultContract.methods.stakeAndClaimAethB.mockReturnValue({
      estimateGas: () => Promise.resolve(ZERO),
      send: () =>
        Promise.resolve({
          receiptPromise: {},
          transactionHash: 'hash1',
        }),
    });

    defaultContract.methods.claimFETH.mockReturnValue({
      estimateGas: () => Promise.resolve(ZERO),
      send: () =>
        Promise.resolve({
          receiptPromise: {},
          transactionHash: 'hash1',
        }),
      encodeABI: () => 'mock-abi',
    });

    defaultContract.methods.claimAETH.mockReturnValue({
      estimateGas: () => Promise.resolve(ZERO),
      send: () =>
        Promise.resolve({
          receiptPromise: {},
          transactionHash: 'hash1',
        }),
      encodeABI: () => 'mock-abi',
    });

    defaultContract.methods.REQUESTER_MINIMUM_POOL_STAKING.mockReturnValue({
      call: () => Promise.resolve(new BigNumber(10 ** 18).multipliedBy(8)),
    });

    defaultContract.getPastEvents.mockReturnValue(
      Promise.resolve([
        {
          event: 'event1',
          returnValues: { amount: 10 ** 18 },
          timestamp,
          transactionHash: 'hash1',
        },
      ]),
    );

    defaultProvider.createContract.mockReturnValue(defaultContract);

    defaultProvider.isConnected.mockReturnValue(true);

    defaultProvider.getWeb3.mockReturnValue(mockWeb3);

    defaultProvider.getContractMethodFee.mockReturnValue(
      new BigNumber(10 ** 6),
    );

    defaultProvider.sendTransactionAsync.mockReturnValue(
      Promise.resolve({
        receiptPromise: {},
        transactionHash: 'hash',
        rawTransaction: 'raw',
      }),
    );

    (ProviderManagerSingleton.getInstance as jest.Mock).mockReturnValue(
      mockProviderManager,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return contracts data', async () => {
    const sdk = await EthSDK.getInstance();

    const [
      ratio,
      aETHcBalance,
      aETHbBalance,
      allowance,
      ethBalance,
      claimableAETHB,
      claimableAETHC,
    ] = await Promise.all([
      sdk.getAethcRatio(),
      sdk.getAethcBalance(),
      sdk.getAethbBalance(),
      sdk.getAllowance(),
      sdk.getEthBalance(),
      sdk.getClaimable(Token.aETHb),
      sdk.getClaimable(Token.aETHc),
    ]);

    expect(ethBalance.toString()).toBe(ethAmount);
    expect(ratio.toNumber()).toBe(0);
    expect(allowance.toNumber()).toBe(0);
    expect(aETHcBalance.toNumber()).toBe(1);
    expect(aETHbBalance.toNumber()).toBe(1);
    expect(claimableAETHB.toNumber()).toBe(8);
    expect(claimableAETHC.toNumber()).toBe(8);
    expect(defaultContract.methods.balanceOf).toBeCalledTimes(2);
    expect(defaultContract.methods.ratio).toBeCalledTimes(1);
    expect(defaultContract.methods.allowance).toBeCalledTimes(1);
    expect(defaultContract.methods.claimableAETHFRewardOf).toBeCalledTimes(1);
    expect(defaultContract.methods.claimableAETHRewardOf).toBeCalledTimes(1);
  });

  test('should return tx data with zero tx.value field', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.fetchTxData('txHash');

    expect(await sdk.fetchTxReceipt('txHash')).toBeDefined();
    expect(result.amount).toStrictEqual(new BigNumber(ethAmount));
    expect(result.isPending).toBe(true);
    expect(result.destinationAddress).toBe(
      '0xe64FCf6327bB016955EFd36e75a852085270c374',
    );
  });

  test('should return tx data with non-zero tx.value fielda', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.fetchTxData('_txHash');

    expect(await sdk.fetchTxReceipt('_txHash')).toBeDefined();
    expect(result.amount).toStrictEqual(new BigNumber(ethAmount));
    expect(result.isPending).toBe(true);
    expect(result.destinationAddress).toBe(
      '0xe64FCf6327bB016955EFd36e75a852085270c374',
    );
  });

  test('should lock shares', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.lockShares({
      amount: new BigNumber(1),
    });

    const {
      contractConfig: { fethContract },
    } = configFromEnv();

    expect(result.transactionHash).toBe('hash');
    expect(result.receiptPromise).toStrictEqual({});

    expect(defaultContract.methods.lockShares).toBeCalledTimes(1);
    expect(defaultContract.methods.lockShares).toBeCalledWith(
      '0xde0b6b3a7640000', // 10 ** 18
    );

    expect(defaultProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(defaultProvider.sendTransactionAsync).toBeCalledWith(
      ZERO_ADDR,
      fethContract,
      {
        data: 'mock-abi',
        estimate: true,
      },
    );
  });

  test('should unlock shares', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.unlockShares({
      amount: new BigNumber(1),
    });

    const {
      contractConfig: { fethContract },
    } = configFromEnv();

    expect(result.transactionHash).toBe('hash');
    expect(result.receiptPromise).toStrictEqual({});

    expect(defaultContract.methods.unlockShares).toBeCalledTimes(1);
    expect(defaultContract.methods.unlockShares).toBeCalledWith(
      '0xde0b6b3a7640000', // 10 ** 18
    );

    expect(defaultProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(defaultProvider.sendTransactionAsync).toBeCalledWith(
      ZERO_ADDR,
      fethContract,
      {
        data: 'mock-abi',
        estimate: true,
      },
    );
  });

  test('should approve aETHc for aETHb', async () => {
    const {
      contractConfig: { fethContract, aethContract },
    } = configFromEnv();

    const sdk = await EthSDK.getInstance();

    const result = await sdk.approveAETHCForAETHB();

    expect(result.transactionHash).toBe('hash');
    expect(result.receiptPromise).toStrictEqual({});

    expect(defaultContract.methods.approve).toBeCalledTimes(1);
    expect(defaultContract.methods.approve).toBeCalledWith(
      fethContract,
      `0x${MAX_UINT256.toString(16)}`,
    );

    expect(defaultProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(defaultProvider.sendTransactionAsync).toBeCalledWith(
      ZERO_ADDR,
      aethContract,
      { data: 'mock-abi', estimate: true },
    );
  });

  test('should approve zero amount aETHc for aETHb', async () => {
    const {
      contractConfig: { fethContract, aethContract },
    } = configFromEnv();

    const sdk = await EthSDK.getInstance();

    const result = await sdk.approveAETHCForAETHB(ZERO);

    expect(result.transactionHash).toBe('hash');
    expect(result.receiptPromise).toStrictEqual({});

    expect(defaultContract.methods.approve).toBeCalledTimes(1);
    expect(defaultContract.methods.approve).toBeCalledWith(fethContract, '0x0');

    expect(defaultProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(defaultProvider.sendTransactionAsync).toBeCalledWith(
      ZERO_ADDR,
      aethContract,
      { data: 'mock-abi', estimate: true },
    );
  });

  test('should add token to wallet', async () => {
    {
      const sdk = await EthSDK.getInstance();

      await sdk.addTokenToWallet(Token.aETHc);

      expect(defaultProvider.addTokenToWallet).toBeCalledWith({
        address: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
        symbol: 'aETHc',
        decimals: 18,
      });
    }

    {
      const sdk = await EthSDK.getInstance();

      await sdk.addTokenToWallet(Token.aETHb);

      expect(defaultProvider.addTokenToWallet).toBeCalledWith({
        address: '0xe64FCf6327bB016955EFd36e75a852085270c374',
        symbol: 'aETHb',
        decimals: 18,
      });
    }
  });

  test('should not add unknown token to wallet', async () => {
    const sdk = await EthSDK.getInstance();

    expect(async () => {
      await sdk.addTokenToWallet('unknown' as TEthToken);
    }).rejects.toThrow();
  });

  test('should return tx history for aETHb', async () => {
    const sdk = await EthSDK.getInstance();

    const { completedAETHB, completedAETHC, totalPending } =
      await sdk.getTxEventsHistory();

    expect(completedAETHB[0]).toStrictEqual({
      txAmount: new BigNumber(ethAmount),
      txDate: new Date(timestamp * 1_000),
      txHash: 'hash1',
      txType: 'event1',
    });
    expect(completedAETHB).toHaveLength(14);
    expect(completedAETHC).toHaveLength(0);
    expect(totalPending).toStrictEqual(ZERO);
  });

  test('should get min stake with read provider', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.getMinStake();

    expect(result).toStrictEqual(new BigNumber('8'));
  });

  test('should stake and claim aETHb', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.stake(new BigNumber(10), Token.aETHb);

    expect(result.transactionHash).toBe('hash1');
  });

  test('should stake and claim aETHc', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.stake(new BigNumber(10), Token.aETHc);

    expect(result.transactionHash).toBe('hash1');
  });

  test('should claim aETHc', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.claim(Token.aETHc);

    expect(result.transactionHash).toBe('hash');
  });

  test('should claim aETHb', async () => {
    const sdk = await EthSDK.getInstance();

    const result = await sdk.claim(Token.aETHb);

    expect(result.transactionHash).toBe('hash');
  });
});
