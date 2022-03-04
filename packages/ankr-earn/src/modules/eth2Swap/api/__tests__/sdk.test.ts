import { configFromEnv } from 'modules/api/config';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { MAX_UINT256, ZERO_ADDR } from 'modules/common/const';

import { TSwapOption } from '../../types';
import { EthSDK } from '../sdk';

jest.mock('modules/api/ProviderManagerSingleton', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
}));

describe('ankr-earn/src/modules/eth2Swap/api/sdk', () => {
  test('should return contracts data', async () => {
    const mockBalanceOf = jest.fn().mockReturnValue({ call: () => 1 });
    const mockRatio = jest.fn().mockReturnValue({ call: () => 0 });
    const mockAllowance = jest.fn().mockReturnValue({ call: () => 0 });

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        getWeb3: () => ({
          eth: { getChainId: () => 56 },
        }),
        isConnected: () => false,
        connect: jest.fn(),
        createContract: () => ({
          methods: {
            balanceOf: mockBalanceOf,
            ratio: mockRatio,
            allowance: mockAllowance,
          },
        }),
      }),
      getReadProvider: () => ({
        getWeb3: () => ({
          eth: { getChainId: () => 1 },
        }),
        createContract: () => ({
          methods: {
            balanceOf: mockBalanceOf,
            ratio: mockRatio,
            allowance: mockAllowance,
          },
        }),
      }),
    };

    (ProviderManagerSingleton.getInstance as jest.Mock).mockReturnValue(
      mockProviderManager,
    );

    const sdk = await EthSDK.getInstance();

    const { ratio, aethBalance, fethBalance, allowance } =
      await sdk.fetchEth2SwapData();

    expect(ratio.toNumber()).toBe(0);
    expect(allowance.toNumber()).toBe(0);
    expect(aethBalance.toNumber()).toBe(1);
    expect(fethBalance.toNumber()).toBe(1);
    expect(mockBalanceOf).toBeCalledTimes(2);
    expect(mockRatio).toBeCalledTimes(1);
    expect(mockAllowance).toBeCalledTimes(1);
  });

  test('should lock shares', async () => {
    const mockSendTransactionAsync = jest.fn().mockReturnValue({
      receiptPromise: {},
      transactionHash: 'hash',
      rawTransaction: 'raw',
    });

    const mockLockShares = jest
      .fn()
      .mockReturnValue({ encodeABI: () => 'mock-abi' });

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        getWeb3: () => ({
          eth: { getChainId: () => 56 },
        }),
        isConnected: () => true,
        connect: jest.fn(),
        createContract: () => ({
          methods: {
            lockShares: mockLockShares,
          },
        }),
        sendTransactionAsync: mockSendTransactionAsync,
      }),
      getReadProvider: jest.fn(),
    };

    (ProviderManagerSingleton.getInstance as jest.Mock).mockReturnValue(
      mockProviderManager,
    );

    const sdk = await EthSDK.getInstance();

    const result = await sdk.lockShares({
      amount: '1',
    });

    const {
      contractConfig: { fethContract },
    } = configFromEnv();

    expect(result.transactionHash).toBe('hash');
    expect(result.receiptPromise).toStrictEqual({});

    expect(mockLockShares).toBeCalledTimes(1);
    expect(mockLockShares).toBeCalledWith('0xde0b6b3a7640000'); // 10 ** 18

    expect(mockSendTransactionAsync).toBeCalledTimes(1);
    expect(mockSendTransactionAsync).toBeCalledWith(ZERO_ADDR, fethContract, {
      data: 'mock-abi',
      estimate: true,
    });
  });

  test('should unlock shares', async () => {
    const mockSendTransactionAsync = jest.fn().mockReturnValue({
      receiptPromise: {},
      transactionHash: 'hash',
    });

    const mockUnlockShares = jest
      .fn()
      .mockReturnValue({ encodeABI: () => 'mock-abi' });

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        getWeb3: () => ({
          eth: { getChainId: () => 56 },
        }),
        isConnected: () => true,
        connect: jest.fn(),
        createContract: () => ({
          methods: {
            unlockShares: mockUnlockShares,
          },
        }),
        sendTransactionAsync: mockSendTransactionAsync,
      }),
      getReadProvider: jest.fn(),
    };

    (ProviderManagerSingleton.getInstance as jest.Mock).mockReturnValue(
      mockProviderManager,
    );

    const sdk = await EthSDK.getInstance();

    const result = await sdk.unlockShares({
      amount: '1',
    });

    const {
      contractConfig: { fethContract },
    } = configFromEnv();

    expect(result.transactionHash).toBe('hash');
    expect(result.receiptPromise).toStrictEqual({});

    expect(mockUnlockShares).toBeCalledTimes(1);
    expect(mockUnlockShares).toBeCalledWith('0xde0b6b3a7640000'); // 10 ** 18

    expect(mockSendTransactionAsync).toBeCalledTimes(1);
    expect(mockSendTransactionAsync).toBeCalledWith(ZERO_ADDR, fethContract, {
      data: 'mock-abi',
      estimate: true,
    });
  });

  test('should approve aETHc for aETHb', async () => {
    const mockSendTransactionAsync = jest.fn().mockReturnValue({
      receiptPromise: {},
      transactionHash: 'hash',
      rawTransaction: 'raw',
    });

    const mockApprove = jest
      .fn()
      .mockReturnValue({ encodeABI: () => 'mock-abi' });

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        getWeb3: () => ({
          eth: { getChainId: () => 56 },
        }),
        isConnected: () => true,
        createContract: () => ({
          methods: {
            approve: mockApprove,
          },
        }),
        sendTransactionAsync: mockSendTransactionAsync,
      }),
      getReadProvider: jest.fn(),
    };

    (ProviderManagerSingleton.getInstance as jest.Mock).mockReturnValue(
      mockProviderManager,
    );

    const {
      contractConfig: { fethContract, aethContract },
    } = configFromEnv();

    const sdk = await EthSDK.getInstance();

    const result = await sdk.approveAETHCForAETHB();

    expect(result.transactionHash).toBe('hash');
    expect(result.receiptPromise).toStrictEqual({});

    expect(mockApprove).toBeCalledTimes(1);
    expect(mockApprove).toBeCalledWith(
      fethContract,
      `0x${MAX_UINT256.toString(16)}`,
    );

    expect(mockSendTransactionAsync).toBeCalledTimes(1);
    expect(mockSendTransactionAsync).toBeCalledWith(ZERO_ADDR, aethContract, {
      data: 'mock-abi',
      estimate: true,
    });
  });

  test('should add token to wallet', async () => {
    const mockAddTokenToWallet = jest.fn();

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        getWeb3: () => ({
          eth: { getChainId: () => 56 },
        }),
        isConnected: () => true,
        addTokenToWallet: mockAddTokenToWallet,
      }),
      getReadProvider: jest.fn(),
    };

    (ProviderManagerSingleton.getInstance as jest.Mock).mockReturnValue(
      mockProviderManager,
    );

    {
      const sdk = await EthSDK.getInstance();

      await sdk.addTokenToWallet({
        swapOption: 'aETHc',
      });
    }

    expect(mockAddTokenToWallet).toBeCalledWith({
      address: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
      symbol: 'aETHc',
      decimals: 18,
    });

    {
      const sdk = await EthSDK.getInstance();

      await sdk.addTokenToWallet({
        swapOption: 'aETHb',
      });
    }

    expect(mockAddTokenToWallet).toBeCalledWith({
      address: '0xe64FCf6327bB016955EFd36e75a852085270c374',
      symbol: 'aETHb',
      decimals: 18,
    });
  });

  test('should not add unknown token to wallet', async () => {
    const mockAddTokenToWallet = jest.fn();

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        getWeb3: () => ({
          eth: { getChainId: () => 56 },
        }),
        isConnected: () => false,
        connect: jest.fn(),
        addTokenToWallet: mockAddTokenToWallet,
      }),
      getReadProvider: jest.fn(),
    };

    (ProviderManagerSingleton.getInstance as jest.Mock).mockReturnValue(
      mockProviderManager,
    );

    const sdk = await EthSDK.getInstance();

    await sdk.addTokenToWallet({
      swapOption: 'unknown' as TSwapOption,
    });

    expect(mockAddTokenToWallet).not.toBeCalled();
  });
});
