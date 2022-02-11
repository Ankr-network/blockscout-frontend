import { ProviderManager } from 'provider';
import { AvailableWriteProviders } from 'provider/providerManager/types';
import { MAX_UINT256, ZERO_ADDR } from 'modules/common/const';
import { configFromEnv } from 'modules/api/config';
import { TSwapOption } from '../../types';
import {
  addTokenToWallet,
  approveAETHCForAETHB,
  fetchEth2SwapData,
  lockShares,
  unlockShares,
} from '../sdk';

describe('ankr-earn/src/modules/eth2Swap/api/sdk', () => {
  test('should return contracts data', async () => {
    const mockBalanceOf = jest.fn().mockReturnValue({ call: () => 1 });
    const mockRatio = jest.fn().mockReturnValue({ call: () => 0 });
    const mockAllowance = jest.fn().mockReturnValue({ call: () => 0 });

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        createContract: () => ({
          methods: {
            balanceOf: mockBalanceOf,
            ratio: mockRatio,
            allowance: mockAllowance,
          },
        }),
      }),
    };

    const { ratio, aethBalance, fethBalance, allowance } =
      await fetchEth2SwapData({
        providerManager: mockProviderManager as unknown as ProviderManager,
        providerId: AvailableWriteProviders.ethCompatible,
      });

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
        createContract: () => ({
          methods: {
            lockShares: mockLockShares,
          },
        }),
        sendTransactionAsync: mockSendTransactionAsync,
      }),
    };

    const result = await lockShares({
      amount: '1',
      providerManager: mockProviderManager as unknown as ProviderManager,
      providerId: AvailableWriteProviders.ethCompatible,
    });

    const {
      contractConfig: { fethContract },
    } = configFromEnv();

    expect(result.transactionHash).toBe('hash');
    expect(result.rawTransaction).toBe('raw');
    expect(result.receiptPromise).toStrictEqual({});

    expect(mockLockShares).toBeCalledTimes(1);
    expect(mockLockShares).toBeCalledWith('0xde0b6b3a7640000'); // 10 ** 18

    expect(mockSendTransactionAsync).toBeCalledTimes(1);
    expect(mockSendTransactionAsync).toBeCalledWith(ZERO_ADDR, fethContract, {
      data: 'mock-abi',
    });
  });

  test('should unlock shares', async () => {
    const mockSendTransactionAsync = jest.fn().mockReturnValue({
      receiptPromise: {},
      transactionHash: 'hash',
      rawTransaction: 'raw',
    });

    const mockUnlockShares = jest
      .fn()
      .mockReturnValue({ encodeABI: () => 'mock-abi' });

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        createContract: () => ({
          methods: {
            unlockShares: mockUnlockShares,
          },
        }),
        sendTransactionAsync: mockSendTransactionAsync,
      }),
    };

    const result = await unlockShares({
      amount: '1',
      providerManager: mockProviderManager as unknown as ProviderManager,
      providerId: AvailableWriteProviders.ethCompatible,
    });

    const {
      contractConfig: { fethContract },
    } = configFromEnv();

    expect(result.transactionHash).toBe('hash');
    expect(result.rawTransaction).toBe('raw');
    expect(result.receiptPromise).toStrictEqual({});

    expect(mockUnlockShares).toBeCalledTimes(1);
    expect(mockUnlockShares).toBeCalledWith('0xde0b6b3a7640000'); // 10 ** 18

    expect(mockSendTransactionAsync).toBeCalledTimes(1);
    expect(mockSendTransactionAsync).toBeCalledWith(ZERO_ADDR, fethContract, {
      data: 'mock-abi',
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
        createContract: () => ({
          methods: {
            approve: mockApprove,
          },
        }),
        sendTransactionAsync: mockSendTransactionAsync,
      }),
    };

    const {
      contractConfig: { fethContract, aethContract },
    } = configFromEnv();

    const result = await approveAETHCForAETHB({
      providerManager: mockProviderManager as unknown as ProviderManager,
      providerId: AvailableWriteProviders.ethCompatible,
    });

    expect(result.transactionHash).toBe('hash');
    expect(result.rawTransaction).toBe('raw');
    expect(result.receiptPromise).toStrictEqual({});

    expect(mockApprove).toBeCalledTimes(1);
    expect(mockApprove).toBeCalledWith(
      fethContract,
      `0x${MAX_UINT256.toString(16)}`,
    );

    expect(mockSendTransactionAsync).toBeCalledTimes(1);
    expect(mockSendTransactionAsync).toBeCalledWith(ZERO_ADDR, aethContract, {
      data: 'mock-abi',
    });
  });

  test('should add token to wallet', async () => {
    const mockAddTokenToWallet = jest.fn();

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        addTokenToWallet: mockAddTokenToWallet,
      }),
    };

    await addTokenToWallet({
      providerManager: mockProviderManager as unknown as ProviderManager,
      providerId: AvailableWriteProviders.ethCompatible,
      swapOption: 'aETHc',
    });

    expect(mockAddTokenToWallet).toBeCalledWith({
      address: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
      symbol: 'aETHc',
      decimals: 18,
    });

    await addTokenToWallet({
      providerManager: mockProviderManager as unknown as ProviderManager,
      providerId: AvailableWriteProviders.ethCompatible,
      swapOption: 'aETHb',
    });

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
        addTokenToWallet: mockAddTokenToWallet,
      }),
    };

    await addTokenToWallet({
      providerManager: mockProviderManager as unknown as ProviderManager,
      providerId: AvailableWriteProviders.ethCompatible,
      swapOption: 'unknown' as TSwapOption,
    });

    expect(mockAddTokenToWallet).not.toBeCalled();
  });
});
