import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import {
  ProviderManager,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { BinanceSDK, EBinanceErrorCodes, EBinancePoolEvents } from '..';
import { ETH_SCALE_FACTOR, ZERO, ZERO_EVENT_HASH } from '../../common';
import {
  BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET,
  CERT_STAKING_LOG_HASH,
} from '../const';

jest.mock('@ankr.com/provider', (): unknown => ({
  ...jest.requireActual('@ankr.com/provider'),
  ProviderManager: jest.fn(),
}));

describe('modules/binance/sdk', () => {
  const DEFAULT_AMOUNT = new BigNumber(12);

  const defaultContract = {
    methods: {},
  };

  const defaultWeb3 = {
    eth: {
      getChainId: jest.fn(),
      Contract: jest.fn(),
      getTransactionReceipt: jest.fn(),
      getTransaction: jest.fn(),
      getBlockNumber: jest.fn(),
      getBalance: jest.fn(),
      abi: { decodeParameters: jest.fn(), decodeLog: jest.fn() },
    },
    utils: { fromWei: (value: string) => value },
  };

  const defaultReadProvider = {
    getWeb3: jest.fn(),
    executeBatchCalls: jest.fn(),
    createContract: jest.fn(),
    getFormattedBalance: jest.fn(),
    getContractMethodFee: jest.fn(),
  };

  const defaultWriteProvider = {
    ...defaultReadProvider,
    currentAccount: 'address',
    isConnected: jest.fn(),
    connect: jest.fn(),
    addTokenToWallet: jest.fn(),
    sendTransactionAsync: jest.fn(),
    getSafeGasPriceWei: jest.fn(),
  };

  beforeEach(() => {
    defaultWeb3.eth.Contract.mockReturnValue(defaultContract);
    defaultWeb3.eth.getChainId.mockReturnValue(97);

    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () => Promise.resolve(defaultWriteProvider),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should initialize sdk', async () => {
    const sdk = await BinanceSDK.getInstance();

    expect(sdk).toBeDefined();
  });

  test('should initialize sdk with user providers', async () => {
    const sdk = await BinanceSDK.getInstance({
      readProvider: defaultReadProvider as unknown as Web3KeyReadProvider,
      writeProvider: defaultWriteProvider as unknown as Web3KeyWriteProvider,
    });

    expect(sdk).toBeDefined();
  });

  test('should initialize sdk with connect', async () => {
    defaultWeb3.eth.getChainId.mockReturnValue(97);
    defaultWriteProvider.isConnected.mockReturnValue(false);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    expect(sdk).toBeDefined();
  });

  test('should lock shares properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        lockShares: jest.fn(() => ({ encodeABI: () => 'abi' })),
      },
    };

    defaultReadProvider.createContract.mockReturnValue(contract);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    await sdk.lockShares({ amount: new BigNumber(10_000) });

    expect(contract.methods.lockShares).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.lockShares).toBeCalledWith('0x21e19e0c9bab2400000');
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
      { data: 'abi', estimate: true },
    );
  });

  test('should unlock shares properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        unlockShares: jest.fn(() => ({ encodeABI: () => 'abi' })),
      },
    };

    defaultReadProvider.createContract.mockReturnValue(contract);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    await sdk.unlockShares({ amount: new BigNumber(10_000) });

    expect(contract.methods.unlockShares).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.unlockShares).toBeCalledWith(
      '0x21e19e0c9bab2400000',
    );
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
      { data: 'abi', estimate: true },
    );
  });

  test('should throw error if trying to lock zero shares', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        lockShares: jest.fn(() => ({ encodeABI: () => 'abi' })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    expect(sdk.lockShares({ amount: ZERO })).rejects.toThrowError(
      EBinanceErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should throw error if trying to unlock zero shares', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        unlockShares: jest.fn(() => ({ encodeABI: () => 'abi' })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    expect(sdk.unlockShares({ amount: ZERO })).rejects.toThrowError(
      EBinanceErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should get minimum stake properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        pendingUnstakesOf: () => ({ call: () => ZERO }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.getPendingClaim();

    expect(result).toStrictEqual(ZERO);
  });

  test('should return certificate balances, ratio and allowance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        ratio: () => ({ call: () => ZERO }),
        allowance: () => ({ call: () => new BigNumber(1) }),
        balanceOf: () => ({ call: () => new BigNumber(10_000) }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const [balance, ratio, allowance] = await Promise.all([
      sdk.getACBalance(),
      sdk.getACRatio(),
      sdk.getACAllowance(),
    ]);

    expect(balance).toStrictEqual(new BigNumber(10_000));
    expect(ratio).toStrictEqual(ZERO);
    expect(allowance).toStrictEqual(new BigNumber(1));
  });

  test('should return balance, ratio for old aETHc', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        ratio: () => ({ call: () => ZERO }),
        balanceOf: () => ({ call: () => new BigNumber(10_000) }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const [balance, ratio] = await Promise.all([
      sdk.getAETHBalance(),
      sdk.getAETHRatio(),
    ]);

    expect(balance).toStrictEqual(new BigNumber(10_000));
    expect(ratio).toStrictEqual(ZERO);
  });

  test('should return bond balance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: jest.fn(() => ({ call: () => new BigNumber(10_000) })),
      },
    };

    defaultWeb3.eth.getBalance.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const balance = await sdk.getABBalance();

    expect(balance).toStrictEqual(new BigNumber(10_000));
  });

  test('should return bnb balance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.getBalance.mockReturnValue(new BigNumber(10_000));
    defaultWeb3.eth.getChainId.mockReturnValue(9000);
    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);
    defaultReadProvider.getFormattedBalance.mockReturnValue(
      new BigNumber(10_000),
    );

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const balance = await sdk.getBNBBalance();

    expect(balance).toStrictEqual(new BigNumber(10_000));
  });

  test('should return available to swap old aETHc balance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: jest.fn(() => ({ call: () => new BigNumber(10_000) })),
      },
    };

    defaultWeb3.eth.getBalance.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const balance = await sdk.getAvailableToSwapAETHC();

    expect(balance).toStrictEqual(new BigNumber(10_000));
  });

  test('should swap old aETHc to new aETHc', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        swapOld: jest.fn(() => ({ encodeABI: () => 'abi' })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    await sdk.swapOldAETHC(new BigNumber(1));

    expect(contract.methods.swapOld).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.swapOld).toBeCalledWith('0xde0b6b3a7640000');
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0xd5B19516c8E3ec07a388f36dDC3A6e02c8AbD5c5',
      { data: 'abi', estimate: true },
    );
  });

  test('should return aETHc balance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: jest.fn(() => ({ call: () => new BigNumber(10_000) })),
      },
    };

    defaultWeb3.eth.getBalance.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const balance = await sdk.getAETHCBalance();

    expect(balance).toStrictEqual(new BigNumber(10_000));
  });

  test('should return swap pool unstake fee', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        unstakeFee: jest.fn(() => ({ call: () => new BigNumber(10_000) })),
      },
    };

    // defaultWeb3.eth.getBalance.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const fee = await sdk.getSwapPoolUnstakeFee();

    expect(fee).toStrictEqual(new BigNumber(100));
  });

  test('should return WBNB swap pool balance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        wbnbAmount: jest.fn(() => ({ call: () => new BigNumber(10_000) })),
      },
    };

    // defaultWeb3.eth.getBalance.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const balance = await sdk.getWBNBSwapPoolBalance();

    expect(balance).toStrictEqual(new BigNumber(10_000));
  });

  test('should flash unstake tokens', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        swapEth: jest.fn(() => ({
          estimateGas: jest.fn(),
          encodeABI: jest.fn(),
        })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    // defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
    //   Promise.resolve(new BigNumber(1)),
    // );

    defaultWriteProvider.isConnected.mockReturnValue(false);

    const sdk = await BinanceSDK.getInstance();

    await sdk.flashUnstake(new BigNumber(1), 'aMATICc');

    expect(contract.methods.swapEth).toBeCalledTimes(1);
  });

  test('should return "false" on approve certificate token', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({
          call: (): string => '0',
        }),
        approve: () => ({
          estimateGas: (): Promise<BigNumber> =>
            Promise.resolve(new BigNumber(1)),
          send: (): undefined => undefined,
        }),
      },
    };

    defaultReadProvider.createContract.mockReturnValue(contract);

    defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
      Promise.resolve(new BigNumber(1)),
    );

    const sdk = await BinanceSDK.getInstance();
    const data = await sdk.approveACTokenForSwapPool(new BigNumber(1));

    expect(data).toBe(false);
  });

  test('should approve certificate token', async () => {
    const TX_RECEIPT: TransactionReceipt = {
      blockHash: 'test-hash',
      blockNumber: 1,
      cumulativeGasUsed: 1,
      effectiveGasPrice: 1,
      from: '1',
      gasUsed: 1,
      logs: [],
      logsBloom: '1',
      status: true,
      to: '2',
      transactionHash: 'test-hash',
      transactionIndex: 1,
    };

    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({
          call: (): string => '0',
        }),
        approve: () => ({
          estimateGas: (): Promise<BigNumber> =>
            Promise.resolve(new BigNumber(1)),
          send: (): TransactionReceipt => TX_RECEIPT,
        }),
      },
    };

    defaultReadProvider.createContract.mockReturnValue(contract);

    defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
      Promise.resolve(new BigNumber(1)),
    );

    const sdk = await BinanceSDK.getInstance();
    const data = await sdk.approveACTokenForSwapPool(new BigNumber(1));

    expect(data).toBe(true);
  });

  test('should approve certificate token if approved', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({
          call: (): string => `${2 * 10 ** 18}`,
        }),
      },
    };

    defaultReadProvider.createContract.mockReturnValue(contract);

    const sdk = await BinanceSDK.getInstance();
    const data = await sdk.approveACTokenForSwapPool(new BigNumber(1));

    expect(data).toBe(true);
  });

  test('should approve cetrificate for bond properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        approve: jest.fn(() => ({ encodeABI: () => 'abi' })),
        allowance: jest.fn(() => ({ call: () => ZERO })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    await sdk.approveACForAB(new BigNumber(1), ETH_SCALE_FACTOR);

    expect(contract.methods.approve).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.approve).toBeCalledWith(
      '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
      '0xde0b6b3a7640000',
    );
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0x46de2fbaf41499f298457cd2d9288df4eb1452ab',
      { data: 'abi', estimate: true },
    );
  });

  test('should return undefined for approve if enough allowance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: jest.fn(() => ({ call: () => 1e18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.approveACForAB(new BigNumber(1), ETH_SCALE_FACTOR);

    expect(result).toBeUndefined();
  });

  test('should unstake tokens properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({ call: () => ZERO }),
        approve: jest.fn(() => ({ send: jest.fn() })),
        unstakeCerts: jest.fn(() => ({ encodeABI: jest.fn() })),
        unstakeBonds: jest.fn(() => ({ encodeABI: jest.fn() })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(false);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    await sdk.unstake(new BigNumber(1), 'aBNBc');

    expect(contract.methods.unstakeCerts).toBeCalledTimes(1);

    await sdk.unstake(new BigNumber(1), 'aBNBb');

    expect(contract.methods.unstakeBonds).toBeCalledTimes(1);
  });

  test('should unstake tokens to exteranl address properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({ call: () => ZERO }),
        approve: jest.fn(() => ({ send: jest.fn() })),
        unstakeCerts: jest.fn(() => ({ encodeABI: jest.fn() })),
        unstakeCertsFor: jest.fn(() => ({ encodeABI: jest.fn() })),
        unstakeBonds: jest.fn(() => ({ encodeABI: jest.fn() })),
        unstakeBondsFor: jest.fn(() => ({ encodeABI: jest.fn() })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(false);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    await sdk.unstakeToExternal(
      new BigNumber(1),
      'aBNBc',
      '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
    );

    expect(contract.methods.unstakeCertsFor).toBeCalledWith(
      '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
      '0xde0b6b3a7640000',
    );

    await sdk.unstakeToExternal(
      new BigNumber(1),
      'aBNBb',
      '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
    );

    expect(contract.methods.unstakeBondsFor).toBeCalledWith(
      '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
      '0xde0b6b3a7640000',
    );
  });

  test('should throw error if unstake amount is less than or equals to zero', async () => {
    const sdk = await BinanceSDK.getInstance();

    expect(sdk.unstake(ZERO, 'aBNBb')).rejects.toThrow(
      EBinanceErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should stake properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({ call: () => ZERO }),
        approve: jest.fn(() => ({ send: jest.fn() })),
        decimals: jest.fn(() => ({ call: () => 18 })),
        stakeAndClaimCerts: jest.fn(() => ({
          estimateGas: jest.fn(() => new BigNumber(1e-6)),
          send: jest.fn(() => ({ transactionHash: 'transactionHash1' })),
        })),
        stakeAndClaimBonds: jest.fn(() => ({
          estimateGas: jest.fn(() => new BigNumber(1e-6)),
          send: jest.fn(() => ({ transactionHash: 'transactionHash2' })),
        })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getBalance.mockReturnValue(new BigNumber(1_000));
    defaultReadProvider.getContractMethodFee.mockReturnValue(
      new BigNumber(1e-6),
    );
    defaultReadProvider.getFormattedBalance.mockReturnValue(
      new BigNumber(1_000),
    );
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(false);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const { txHash: txHash1 } = await sdk.stake(DEFAULT_AMOUNT, 'aBNBc');

    expect(txHash1).toBe('transactionHash1');
    expect(contract.methods.stakeAndClaimCerts).toBeCalledTimes(3);

    const { txHash: txHash2 } = await sdk.stake(DEFAULT_AMOUNT, 'aBNBb');

    expect(txHash2).toBe('transactionHash2');
    expect(contract.methods.stakeAndClaimBonds).toBeCalledTimes(2);
  });

  test('should throw error if stake amount is less than or equals to zero', async () => {
    const sdk = await BinanceSDK.getInstance();

    expect(sdk.stake(ZERO, 'aBNBb')).rejects.toThrow(
      EBinanceErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should throw error if BNB balance in stake is zero', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        decimals: () => ({
          call: () => 18,
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getFormattedBalance.mockReturnValue(ZERO);

    const sdk = await BinanceSDK.getInstance();

    expect(sdk.stake(DEFAULT_AMOUNT, 'aBNBb')).rejects.toThrow(
      EBinanceErrorCodes.LOW_BALANCE_FOR_GAS_FEE,
    );
  });

  test('should return tx receipt properly', async () => {
    const sdk = await BinanceSDK.getInstance();

    const receipt = await sdk.fetchTxReceipt('hash');

    expect(receipt).toBeUndefined();
  });

  test('should return tx receipt with logs properly', async () => {
    defaultWeb3.eth.getTransactionReceipt.mockReturnValue({
      logs: [{ topics: [CERT_STAKING_LOG_HASH, ''] }],
    });

    defaultWeb3.eth.abi.decodeLog.mockReturnValue({ amount: '2' });

    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const receipt = await sdk.fetchTxReceipt('hash');

    expect(receipt?.certAmount).toStrictEqual('2');
  });

  test('should return tx data properly', async () => {
    defaultWeb3.eth.getTransaction.mockReturnValue({
      input: '123456',
      txIndex: 1,
      from: 'destinationAddress',
      value: '0',
    });

    defaultWeb3.eth.abi.decodeParameters.mockReturnValue({ 0: 100 });

    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const data = await sdk.fetchTxData('hash');

    expect(data).toStrictEqual({
      amount: new BigNumber(100),
      destinationAddress: 'destinationAddress',
      isPending: false,
    });
  });

  test('should return tx data properly with value', async () => {
    defaultWeb3.eth.getTransaction.mockReturnValue({
      input: '123456',
      txIndex: 1,
      from: 'destinationAddress',
      value: '100',
    });

    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const data = await sdk.fetchTxData('hash');

    expect(data).toStrictEqual({
      amount: new BigNumber(100),
      destinationAddress: 'destinationAddress',
      isPending: false,
    });
  });

  test('should get minimum stake properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        getMinimumStake: () => ({ call: () => DEFAULT_AMOUNT }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.getMinimumStake();

    expect(result).toStrictEqual(DEFAULT_AMOUNT);
  });

  test('should add token to wallet with connect', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aBNBb' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getChainId.mockReturnValue(9000);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(false);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.addTokenToWallet('aBNBb');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0xab56897fe4e9f0757e02b54c27e81b9ddd6a30ae',
      symbol: 'aBNBb',
      decimals: 18,
      chainId: 97,
    });
  });

  test('should add token to wallet without connect', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aBNBc' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(true);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.addTokenToWallet('aBNBc');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0x46de2fbaf41499f298457cd2d9288df4eb1452ab',
      symbol: 'aBNBc',
      decimals: 18,
      chainId: 97,
    });
  });

  test('should get error token if token is not supported', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aETHc' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getChainId.mockReturnValue(9_000);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(true);

    const sdk = await BinanceSDK.getInstance();

    await expect(sdk.addTokenToWallet('MATIC')).rejects.toThrowError(
      EBinanceErrorCodes.UNSUPPORTED_TOKEN,
    );
  });

  test('should add aETHc token to wallet', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aETHc' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getChainId.mockReturnValue(9000);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(true);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.addTokenToWallet('aETHc');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0x0ae4837cf3d254e4a1b5a77c0fac591ba253773d',
      symbol: 'aETHc',
      decimals: 18,
      chainId: 97,
    });
  });

  test('should add old aETHc token to wallet', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aETH' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getChainId.mockReturnValue(9000);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(true);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.addTokenToWallet('aETH');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0xd5B19516c8E3ec07a388f36dDC3A6e02c8AbD5c5',
      symbol: 'aETH',
      decimals: 18,
      chainId: 97,
    });
  });

  test('should get error token if token is not supported', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aETHc' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getChainId.mockReturnValue(9000);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(true);

    const sdk = await BinanceSDK.getInstance();

    await expect(sdk.addTokenToWallet('MATIC')).rejects.toThrowError(
      EBinanceErrorCodes.UNSUPPORTED_TOKEN,
    );
  });

  test('should get pending data properly', async () => {
    const contract = {
      ...defaultContract,
      getPastEvents: jest.fn().mockResolvedValue([
        {
          returnValues: {
            amount: new BigNumber(200),
            isRebasing: false,
          },
          transactionHash: 'tx1',
          raw: { data: ZERO_EVENT_HASH },
        },
        {
          returnValues: {
            amount: new BigNumber(100),
            isRebasing: true,
          },
          transactionHash: 'tx2',
          raw: { data: '' },
        },
        {
          returnValues: {
            amount: new BigNumber(700),
            isRebasing: true,
          },
          transactionHash: 'tx3',
          raw: { data: '' },
        },
      ]),
      methods: {
        ratio: jest.fn(() => ({
          call: () => new BigNumber(0.9),
        })),
        pendingUnstakesOf: jest.fn(() => ({
          call: () => new BigNumber(1000),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(
      BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET + 1,
    );

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const data = await sdk.getPendingData();

    expect(data).toStrictEqual({
      pendingBond: new BigNumber(800),
      pendingCertificate: new BigNumber(180),
    });
  });

  test('should return relayer fee', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        getRelayerFee: jest.fn(() => ({
          call: () => new BigNumber(1e-1),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(
      BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET + 1,
    );

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const data = await sdk.getRelayerFee();

    expect(data).toStrictEqual(new BigNumber(1e-1));
  });

  test('should return stake gas fee', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        stakeAndClaimCerts: jest.fn(() => ({
          estimateGas: () => new BigNumber(1e-2),
        })),

        stakeAndClaimBonds: jest.fn(() => ({
          estimateGas: () => new BigNumber(1e-2),
        })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getContractMethodFee.mockReturnValue(
      new BigNumber(1e-2),
    );
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const fee = await sdk.getStakeGasFee(new BigNumber(1_000), 'aBNBb');

    expect(fee).toStrictEqual(new BigNumber(1e-2));
  });

  test('should return events history properly', async () => {
    const events = [
      {
        returnValues: {
          amount: new BigNumber(200),
          isRebasing: false,
        },
        transactionHash: 'txHash1',
        raw: { data: '' },
        event: EBinancePoolEvents.UnstakePending,
      },
      {
        returnValues: {
          amount: new BigNumber(100),
          isRebasing: true,
        },
        transactionHash: 'txHash2',
        raw: { data: '' },
        event: EBinancePoolEvents.Staked,
      },
      {
        returnValues: {
          amount: new BigNumber(700),
          isRebasing: true,
        },
        transactionHash: 'txHash3',
        raw: { data: '' },
        event: EBinancePoolEvents.Staked,
      },
      {
        returnValues: {
          amount: new BigNumber(1),
          isRebasing: true,
        },
        raw: { data: ZERO_EVENT_HASH },
        transactionHash: 'txHash4',
      },
    ];

    const blocks = [
      { timestamp: Math.floor(+new Date() / 1_000 + 1) },
      { timestamp: Math.floor(+new Date() / 1_000 + 2) },
      { timestamp: Math.floor(+new Date() / 1_000 + 3) },
      { timestamp: Math.floor(+new Date() / 1_000 + 4) },
    ];

    const contract = {
      ...defaultContract,
      getPastEvents: jest.fn().mockResolvedValue(events),
      methods: {
        ratio: jest.fn(() => ({
          call: () => new BigNumber(0.98),
        })),
        pendingUnstakesOf: jest.fn(() => ({
          call: () => new BigNumber(60756),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(
      BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET + 1,
    );
    defaultReadProvider.executeBatchCalls.mockResolvedValue(blocks);

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.getTxEventsHistory();

    expect(result.completedBond).toHaveLength(4);
    expect(result.completedCertificate).toHaveLength(4);
    expect(result.pendingBond).toHaveLength(4);
    expect(result.pendingCertificate).toHaveLength(4);
  });

  test('should return empty events history', async () => {
    const contract = {
      ...defaultContract,
      getPastEvents: jest.fn().mockResolvedValue([]),
      methods: {
        ratio: jest.fn(() => ({
          call: () => new BigNumber(0.98),
        })),
        pendingUnstakesOf: jest.fn(() => ({
          call: () => ZERO,
        })),
      },
    };

    defaultReadProvider.executeBatchCalls.mockResolvedValue([]);

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await BinanceSDK.getInstance();

    const result = await sdk.getTxEventsHistory();

    expect(result.completedBond).toStrictEqual([]);
    expect(result.completedCertificate).toStrictEqual([]);
    expect(result.pendingBond).toStrictEqual([]);
    expect(result.pendingCertificate).toStrictEqual([]);
  });
});
