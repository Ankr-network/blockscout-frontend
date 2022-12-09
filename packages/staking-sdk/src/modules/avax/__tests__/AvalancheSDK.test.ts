import BigNumber from 'bignumber.js';

import {
  ProviderManager,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { AvalancheSDK, EAvalancheErrorCodes, EAvalanchePoolEvents } from '..';
import { ETH_SCALE_FACTOR, ZERO, ZERO_EVENT_HASH } from '../../common';
import { convertNumberToHex } from '../../utils';
import { AVAX_HISTORY_2_WEEKS_OFFSET } from '../const';

jest.mock('@ankr.com/provider', (): unknown => ({
  ...jest.requireActual('@ankr.com/provider'),
  ProviderManager: jest.fn(),
}));

describe('modules/avax/sdk', () => {
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
    utils: {
      fromWei: (value: string) => value,
      numberToHex: convertNumberToHex,
    },
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
  };

  beforeEach(() => {
    defaultWeb3.eth.Contract.mockReturnValue(defaultContract);
    defaultWeb3.eth.getChainId.mockReturnValue(43113);

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
    const sdk = await AvalancheSDK.getInstance();

    expect(sdk).toBeDefined();
  });

  test('should initialize sdk with user providers', async () => {
    const sdk = await AvalancheSDK.getInstance({
      readProvider: defaultReadProvider as unknown as Web3KeyReadProvider,
      writeProvider: defaultWriteProvider as unknown as Web3KeyWriteProvider,
    });

    expect(sdk).toBeDefined();
  });

  test('should initialize sdk with connect', async () => {
    defaultWeb3.eth.getChainId.mockReturnValue(43113);
    defaultWriteProvider.isConnected.mockReturnValue(false);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await AvalancheSDK.getInstance();

    expect(sdk).toBeDefined();
  });

  test('should lock shares properly', async () => {
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

    const sdk = await AvalancheSDK.getInstance();

    await sdk.lockShares({ amount: new BigNumber(10_000) });

    expect(contract.methods.lockShares).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.lockShares).toBeCalledWith('0x21e19e0c9bab2400000');
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
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

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await AvalancheSDK.getInstance();

    await sdk.unlockShares({ amount: new BigNumber(10_000) });

    expect(contract.methods.unlockShares).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.unlockShares).toBeCalledWith(
      '0x21e19e0c9bab2400000',
    );
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
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

    const sdk = await AvalancheSDK.getInstance();

    expect(sdk.lockShares({ amount: ZERO })).rejects.toThrowError(
      EAvalancheErrorCodes.ZERO_AMOUNT,
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

    const sdk = await AvalancheSDK.getInstance();

    expect(sdk.unlockShares({ amount: ZERO })).rejects.toThrowError(
      EAvalancheErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should get minimum stake properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        pendingAvaxClaimsOf: () => ({ call: () => ZERO }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await AvalancheSDK.getInstance();

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

    const sdk = await AvalancheSDK.getInstance();

    const [balance, ratio, allowance] = await Promise.all([
      sdk.getACBalance(),
      sdk.getACRatio(),
      sdk.getACAllowance(),
    ]);

    expect(balance).toStrictEqual(new BigNumber(10_000));
    expect(ratio).toStrictEqual(ZERO);
    expect(allowance).toStrictEqual(new BigNumber(1));
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

    const sdk = await AvalancheSDK.getInstance();

    const balance = await sdk.getABBalance();

    expect(balance).toStrictEqual(new BigNumber(10_000));
  });

  test('should return AVAX balance', async () => {
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

    const sdk = await AvalancheSDK.getInstance();

    const balance = await sdk.getAVAXBalance();

    expect(balance).toStrictEqual(new BigNumber(10_000));
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

    const sdk = await AvalancheSDK.getInstance();

    await sdk.approveACForAB(new BigNumber(1), ETH_SCALE_FACTOR);

    expect(contract.methods.approve).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.approve).toBeCalledWith(
      '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
      '0xde0b6b3a7640000',
    );
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0x22f70fE6C3949cDcA413A6D441D7972255440660',
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

    const sdk = await AvalancheSDK.getInstance();

    const result = await sdk.approveACForAB(new BigNumber(1), ETH_SCALE_FACTOR);

    expect(result).toBeUndefined();
  });

  test('should unstake tokens properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({ call: () => ZERO }),
        approve: jest.fn(() => ({ send: jest.fn() })),
        claimCerts: jest.fn(() => ({
          encodeABI: jest.fn(),
          estimateGas: jest.fn(() => new BigNumber(1)),
        })),
        claimBonds: jest.fn(() => ({
          encodeABI: jest.fn(),
          estimateGas: jest.fn(() => new BigNumber(1)),
        })),
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

    const sdk = await AvalancheSDK.getInstance();

    await sdk.unstake(new BigNumber(1), 'aAVAXc');

    expect(contract.methods.claimCerts).toBeCalledTimes(1);

    await sdk.unstake(new BigNumber(1), 'aAVAXb');

    expect(contract.methods.claimBonds).toBeCalledTimes(1);
  });

  test('should throw error if unstake amount is less than or equals to zero', async () => {
    const sdk = await AvalancheSDK.getInstance();

    expect(sdk.unstake(ZERO, 'aAVAXb')).rejects.toThrow(
      EAvalancheErrorCodes.ZERO_AMOUNT,
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

    const sdk = await AvalancheSDK.getInstance();

    const { txHash: txHash1 } = await sdk.stake(new BigNumber(12), 'aAVAXc');

    expect(txHash1).toBe('transactionHash1');
    expect(contract.methods.stakeAndClaimCerts).toBeCalledTimes(2);

    const { txHash: txHash2 } = await sdk.stake(new BigNumber(12), 'aAVAXb');

    expect(txHash2).toBe('transactionHash2');
    expect(contract.methods.stakeAndClaimBonds).toBeCalledTimes(1);
  });

  test('should throw error if stake amount is less than or equals to zero', async () => {
    const sdk = await AvalancheSDK.getInstance();

    expect(sdk.stake(ZERO, 'aAVAXb')).rejects.toThrow(
      EAvalancheErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should return tx receipt properly', async () => {
    const sdk = await AvalancheSDK.getInstance();

    const receipt = await sdk.fetchTxReceipt('hash');

    expect(receipt).toBeUndefined();
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

    const sdk = await AvalancheSDK.getInstance();

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

    const sdk = await AvalancheSDK.getInstance();

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
        getMinimumStake: () => ({ call: () => new BigNumber(12) }),
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

    const sdk = await AvalancheSDK.getInstance();

    const result = await sdk.getMinimumStake();

    expect(result).toStrictEqual(new BigNumber(12));
  });

  test('should add token to wallet with connect', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aAVAXb' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getChainId.mockReturnValue(9000);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(false);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await AvalancheSDK.getInstance();

    const result = await sdk.addTokenToWallet('aAVAXb');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0xBd97c29aa3E83C523C9714edCA8DB8881841a593',
      symbol: 'aAVAXb',
      decimals: 18,
      chainId: 43113,
    });
  });

  test('should add token to wallet without connect', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        symbol: jest.fn(() => ({ call: () => 'aAVAXc' })),
        decimals: jest.fn(() => ({ call: () => 18 })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultWriteProvider.isConnected.mockReturnValue(true);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await AvalancheSDK.getInstance();

    const result = await sdk.addTokenToWallet('aAVAXc');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0x22f70fE6C3949cDcA413A6D441D7972255440660',
      symbol: 'aAVAXc',
      decimals: 18,
      chainId: 43113,
    });
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
        },
        {
          returnValues: {
            amount: new BigNumber(100),
            isRebasing: true,
          },
          transactionHash: 'tx2',
        },
        {
          returnValues: {
            amount: new BigNumber(700),
            isRebasing: true,
          },
          transactionHash: 'tx3',
        },
      ]),
      methods: {
        ratio: jest.fn(() => ({
          call: () => new BigNumber(0.9),
        })),
        pendingAvaxClaimsOf: jest.fn(() => ({
          call: () => new BigNumber(1000),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(
      AVAX_HISTORY_2_WEEKS_OFFSET + 1,
    );

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await AvalancheSDK.getInstance();

    const data = await sdk.getPendingData();

    expect(data).toStrictEqual({
      pendingBond: new BigNumber(800),
      pendingCertificate: new BigNumber(180),
    });
  });

  test('should get empty pending data properly', async () => {
    const contract = {
      ...defaultContract,
      getPastEvents: jest.fn().mockResolvedValue([]),
      methods: {
        ratio: jest.fn(() => ({
          call: () => new BigNumber(0.98),
        })),
        pendingAvaxClaimsOf: jest.fn(() => ({
          call: () => new BigNumber(60756),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(
      AVAX_HISTORY_2_WEEKS_OFFSET - 1,
    );

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.createContract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await AvalancheSDK.getInstance();

    const data = await sdk.getPendingData();

    expect(data).toStrictEqual({
      pendingBond: ZERO,
      pendingCertificate: ZERO,
    });
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

    const sdk = await AvalancheSDK.getInstance();

    const fee = await sdk.getStakeGasFee(new BigNumber(1_000), 'aAVAXb');

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
        event: EAvalanchePoolEvents.AvaxClaimPending,
      },
      {
        returnValues: {
          amount: new BigNumber(100),
          isRebasing: true,
        },
        transactionHash: 'txHash2',
        raw: { data: '' },
        event: EAvalanchePoolEvents.StakePending,
      },
      {
        returnValues: {
          amount: new BigNumber(700),
          isRebasing: true,
        },
        transactionHash: 'txHash3',
        raw: { data: '' },
        event: EAvalanchePoolEvents.StakePending,
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
        pendingAvaxClaimsOf: jest.fn(() => ({
          call: () => new BigNumber(60756),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(
      AVAX_HISTORY_2_WEEKS_OFFSET + 1,
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

    const sdk = await AvalancheSDK.getInstance();

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
        pendingAvaxClaimsOf: jest.fn(() => ({
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

    const sdk = await AvalancheSDK.getInstance();

    const result = await sdk.getTxEventsHistory();

    expect(result.completedBond).toStrictEqual([]);
    expect(result.completedCertificate).toStrictEqual([]);
    expect(result.pendingBond).toStrictEqual([]);
    expect(result.pendingCertificate).toStrictEqual([]);
  });
});
