import BigNumber from 'bignumber.js';
import nock from 'nock';

import {
  ProviderManager,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { PolygonSDK } from '..';
import { ETH_SCALE_FACTOR, ZERO } from '../../common';
import { BLOCK_OFFSET } from '../const';
import {
  EPolygonErrorCodes,
  EPolygonPoolEvents,
  EPolygonPoolEventsMap,
} from '../types';

jest.mock('@ankr.com/provider', (): unknown => ({
  ...jest.requireActual('@ankr.com/provider'),
  ProviderManager: jest.fn(),
}));

describe('modules/polygon/sdk', () => {
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
      abi: { decodeParameters: jest.fn() },
    },
    utils: { fromWei: (value: string) => value },
  };

  const defaultReadProvider = {
    getWeb3: jest.fn(),
    executeBatchCalls: jest.fn(),
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
    defaultWeb3.eth.getChainId.mockReturnValue(1);

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
    const sdk = await PolygonSDK.getInstance();

    expect(sdk).toBeDefined();
  });

  test('should initialize sdk with user providers', async () => {
    const sdk = await PolygonSDK.getInstance({
      readProvider: defaultReadProvider as unknown as Web3KeyReadProvider,
      writeProvider: defaultWriteProvider as unknown as Web3KeyWriteProvider,
    });

    expect(sdk).toBeDefined();
  });

  test('should add token to wallet with connect', async () => {
    defaultWriteProvider.isConnected.mockReturnValue(false);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await PolygonSDK.getInstance();

    const result = await sdk.addTokenToWallet('aMATICb');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0x691EE9707B34771b0C280ffC48659b77F8aF7458',
      symbol: 'aMATICb',
      decimals: 18,
      chainId: 5,
    });
  });

  test('should add token to wallet without connect', async () => {
    defaultWriteProvider.isConnected.mockReturnValue(true);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await PolygonSDK.getInstance();

    const result = await sdk.addTokenToWallet('aMATICc');

    expect(result).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0x148BF822CAE6a61B2F278801eF4369FddD2a80DF',
      symbol: 'aMATICc',
      decimals: 18,
      chainId: 5,
    });
  });

  test('should unstake tokens properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({ call: () => ZERO }),
        approve: jest.fn(() => ({ send: jest.fn() })),
        unstakeCerts: jest.fn(() => ({ send: jest.fn() })),
        unstakeBonds: jest.fn(() => ({ send: jest.fn() })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);
    defaultWriteProvider.isConnected.mockReturnValue(false);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    await sdk.unstake(new BigNumber(1), 'aMATICc');

    expect(contract.methods.approve).toBeCalledTimes(1);
    expect(contract.methods.unstakeCerts).toBeCalledTimes(1);

    await sdk.unstake(new BigNumber(1), 'aMATICb');

    expect(contract.methods.approve).toBeCalledTimes(2);
    expect(contract.methods.unstakeBonds).toBeCalledTimes(1);
  });

  test('should throw error if unstake amount is less than or equals to zero', async () => {
    const sdk = await PolygonSDK.getInstance();

    expect(sdk.unstake(new BigNumber(0), 'aMATICb')).rejects.toThrow(
      EPolygonErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should return unstake fee data properly', async () => {
    const expectedData = {
      unstakeFee: 0.1,
      useBeforeBlock: 1,
      signature: 'signature',
    };

    nock('https://api.goerli.stkr.io')
      .get('/v1alpha/polygon/unstakeFee')
      .query({ address: 'address' })
      .reply(200, expectedData);

    const sdk = await PolygonSDK.getInstance();

    const data = await sdk.getUnstakeFee();

    expect(data).toStrictEqual(expectedData);
  });

  test('should stake aMATICc properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({ call: () => ZERO }),
        approve: jest.fn(() => ({ send: jest.fn() })),
        stakeAndClaimCerts: jest.fn(() => ({
          send: jest.fn(() => ({ transactionHash: 'transactionHash1' })),
        })),
        stakeAndClaimBonds: jest.fn(() => ({
          send: jest.fn(() => ({ transactionHash: 'transactionHash2' })),
        })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);
    defaultWriteProvider.isConnected.mockReturnValue(false);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    const { txHash: txHash1 } = await sdk.stake(new BigNumber(12), 'aMATICc');

    expect(txHash1).toBe('transactionHash1');
    expect(contract.methods.stakeAndClaimCerts).toBeCalledTimes(1);
    expect(contract.methods.approve).toBeCalledTimes(1);

    const { txHash: txHash2 } = await sdk.stake(new BigNumber(12), 'aMATICb');

    expect(txHash2).toBe('transactionHash2');
    expect(contract.methods.stakeAndClaimBonds).toBeCalledTimes(1);
    expect(contract.methods.approve).toBeCalledTimes(2);
  });

  test('should return tx receipt properly', async () => {
    const sdk = await PolygonSDK.getInstance();

    const receipt = await sdk.fetchTxReceipt('hash');

    expect(receipt).toBeUndefined();
  });

  test('should return tx data properly', async () => {
    defaultWeb3.eth.getTransaction.mockReturnValue({
      input: '123456',
      txIndex: 1,
      from: 'destinationAddress',
    });

    defaultWeb3.eth.abi.decodeParameters.mockReturnValue({ 0: 100 });

    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

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
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    const result = await sdk.getMinimumStake();

    expect(result).toStrictEqual(new BigNumber(12));
  });

  test('should get pending claim properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        pendingMaticClaimsOf: () => ({ call: () => ZERO }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

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
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

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
        balanceOf: () => ({ call: () => new BigNumber(10_000) }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    const balance = await sdk.getABBalance();

    expect(balance).toStrictEqual(new BigNumber(10_000));
  });

  test('should return matic balance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: () => ({ call: () => new BigNumber(23) }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultWeb3.eth.getChainId.mockReturnValue(9000);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    const balance = await sdk.getMaticBalance();

    expect(balance).toStrictEqual(new BigNumber(23));
  });

  test('should approve cetrificate for bond properly', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        approve: jest.fn(() => ({ encodeABI: () => 'abi' })),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    await sdk.approveACForAB(new BigNumber(1), ETH_SCALE_FACTOR);

    expect(contract.methods.approve).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.approve).toBeCalledWith(
      '0x691EE9707B34771b0C280ffC48659b77F8aF7458',
      '0xde0b6b3a7640000',
    );
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0x148BF822CAE6a61B2F278801eF4369FddD2a80DF',
      { data: 'abi', estimate: true },
    );
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

    const sdk = await PolygonSDK.getInstance();

    await sdk.lockShares({ amount: new BigNumber(10_000) });

    expect(contract.methods.lockShares).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.lockShares).toBeCalledWith('0x21e19e0c9bab2400000');
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0x691EE9707B34771b0C280ffC48659b77F8aF7458',
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

    const sdk = await PolygonSDK.getInstance();

    await sdk.unlockShares({ amount: new BigNumber(10_000) });

    expect(contract.methods.unlockShares).toBeCalledTimes(1);
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledTimes(1);
    expect(contract.methods.unlockShares).toBeCalledWith(
      '0x21e19e0c9bab2400000',
    );
    expect(defaultWriteProvider.sendTransactionAsync).toBeCalledWith(
      'address',
      '0x691EE9707B34771b0C280ffC48659b77F8aF7458',
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

    const sdk = await PolygonSDK.getInstance();

    expect(sdk.lockShares({ amount: ZERO })).rejects.toThrowError(
      EPolygonErrorCodes.ZERO_AMOUNT,
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

    const sdk = await PolygonSDK.getInstance();

    expect(sdk.unlockShares({ amount: ZERO })).rejects.toThrowError(
      EPolygonErrorCodes.ZERO_AMOUNT,
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
        },
        {
          returnValues: {
            amount: new BigNumber(100),
            isRebasing: true,
          },
        },
        {
          returnValues: {
            amount: new BigNumber(700),
            isRebasing: true,
          },
        },
      ]),
      methods: {
        ratio: jest.fn(() => ({
          call: () => new BigNumber(0.98),
        })),
        pendingMaticClaimsOf: jest.fn(() => ({
          call: () => new BigNumber(60756),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(BLOCK_OFFSET + 1);

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    const data = await sdk.getPendingData();

    expect(data).toStrictEqual({
      pendingBond: new BigNumber(48800),
      pendingCertificate: new BigNumber(11956),
    });
  });

  test('should return events history properly', async () => {
    const events = [
      {
        returnValues: {
          amount: new BigNumber(200),
          isRebasing: false,
        },
        transactionHash: 'txHash1',
        event: EPolygonPoolEvents.MaticClaimPending,
      },
      {
        returnValues: {
          amount: new BigNumber(100),
          isRebasing: true,
        },
        transactionHash: 'txHash2',

        event: EPolygonPoolEvents.TokensBurned,
      },
      {
        returnValues: {
          amount: new BigNumber(700),
          isRebasing: true,
        },
        transactionHash: 'txHash3',
        event: EPolygonPoolEvents.StakePendingV2,
      },
      {
        returnValues: {
          amount: new BigNumber(1),
          isRebasing: true,
        },
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
        pendingMaticClaimsOf: jest.fn(() => ({
          call: () => new BigNumber(60756),
        })),
      },
    };

    defaultWeb3.eth.getBlockNumber.mockResolvedValue(BLOCK_OFFSET + 1);
    defaultReadProvider.executeBatchCalls.mockResolvedValue(blocks);

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    const result = await sdk.getTxEventsHistory();

    expect(result.completedBond).toStrictEqual([
      {
        txAmount: events[1].returnValues.amount,
        txDate: new Date(blocks[3].timestamp * 1_000),
        txHash: 'txHash2',
        txType: EPolygonPoolEventsMap.Unstaking,
      },
      {
        txAmount: events[3].returnValues.amount,
        txDate: new Date(blocks[2].timestamp * 1_000),
        txHash: 'txHash4',
        txType: null,
      },
      {
        txAmount: events[2].returnValues.amount,
        txDate: new Date(blocks[1].timestamp * 1_000),
        txHash: 'txHash3',
        txType: EPolygonPoolEventsMap.Staking,
      },
      {
        txAmount: events[1].returnValues.amount,
        txDate: new Date(blocks[0].timestamp * 1_000),
        txHash: 'txHash2',
        txType: EPolygonPoolEventsMap.Unstaking,
      },
    ]);
    expect(result.completedCertificate).toStrictEqual([
      {
        txAmount: new BigNumber(196),
        txDate: new Date(blocks[3].timestamp * 1_000),
        txHash: 'txHash1',
        txType: EPolygonPoolEventsMap.Unstaking,
      },
      {
        txAmount: new BigNumber(196),
        txDate: new Date(blocks[2].timestamp * 1_000),
        txHash: 'txHash1',
        txType: EPolygonPoolEventsMap.Unstaking,
      },
      {
        txAmount: new BigNumber(196),
        txDate: new Date(blocks[1].timestamp * 1_000),
        txHash: 'txHash1',
        txType: EPolygonPoolEventsMap.Unstaking,
      },
      {
        txAmount: new BigNumber(196),
        txDate: new Date(blocks[0].timestamp * 1_000),
        txHash: 'txHash1',
        txType: EPolygonPoolEventsMap.Unstaking,
      },
    ]);
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
        pendingMaticClaimsOf: jest.fn(() => ({
          call: () => ZERO,
        })),
      },
    };

    defaultReadProvider.executeBatchCalls.mockResolvedValue([]);

    defaultWeb3.eth.Contract.mockReturnValue(contract);
    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHWriteProvider: () =>
        Promise.resolve({ ...defaultWriteProvider, ...defaultReadProvider }),
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
    });

    const sdk = await PolygonSDK.getInstance();

    const result = await sdk.getTxEventsHistory();

    expect(result.completedBond).toStrictEqual([]);
    expect(result.completedCertificate).toStrictEqual([]);
    expect(result.pendingBond).toStrictEqual([]);
    expect(result.pendingCertificate).toStrictEqual([]);
  });
});
