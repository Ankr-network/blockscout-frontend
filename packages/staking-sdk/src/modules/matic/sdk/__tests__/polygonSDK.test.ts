import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { Log, TransactionReceipt } from 'web3-core';

import {
  EEthereumNetworkId,
  ITokenInfo,
  ProviderManager,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { configFromEnv, POLYGON_NETWORK_BY_ENV, ZERO } from '../../../common';
import { IPendingData, IStakeData, ITxEventsHistoryData } from '../../../stake';
import { MATIC_DECIMALS, MATIC_SCALE_FACTOR } from '../../const';
import { EMaticSDKErrorCodes, TMaticSyntToken } from '../../types';
import { IGetTxData, MaticPolygonSDK } from '../polygonSDK';

jest.mock('@ankr.com/provider', () => ({
  ...jest.requireActual('@ankr.com/provider'),
  ProviderManager: jest.fn(),
}));

const { polygonConfig } = configFromEnv();

describe('modules/matic/sdk/polygonSDK', () => {
  const FEE_MAX = '100000';
  const ONE = new BigNumber(1);
  const TOKEN_BOND: TMaticSyntToken = 'aMATICb';
  const TOKEN_CERT: TMaticSyntToken = 'aMATICc';
  const TX_ADDR = 'test-addr';
  const TX_HASH = 'test-hash';

  const TX_RECEIPT: TransactionReceipt = {
    blockHash: TX_HASH,
    blockNumber: 1,
    cumulativeGasUsed: 1,
    effectiveGasPrice: 1,
    from: '1',
    gasUsed: 1,
    logs: [],
    logsBloom: '1',
    status: true,
    to: '2',
    transactionHash: TX_HASH,
    transactionIndex: 1,
  };

  const defaultContract = {
    methods: {},
  };

  const defaultWeb3 = {
    eth: {
      Contract: jest.fn(),
      getChainId: jest.fn(),
      getTransaction: jest.fn(),
      getTransactionReceipt: jest.fn(),
    },
    utils: {
      fromWei: web3.utils.fromWei,
      toBN: web3.utils.toBN,
    },
  };

  const defaultReadProvider = {
    getWeb3: jest.fn(),
  };

  const defaultWriteProvider = {
    ...defaultReadProvider,
    sendTransactionAsync: jest.fn(),
    addTokenToWallet: jest.fn(),
    connect: jest.fn(),
    getContractMethodFee: jest.fn(),
    getSafeGasPriceWei: jest.fn(),
    isConnected: jest.fn(),
  };

  beforeEach(() => {
    defaultWeb3.eth.getChainId.mockReturnValue(EEthereumNetworkId.polygon);

    defaultReadProvider.getWeb3.mockReturnValue(defaultWeb3);

    (ProviderManager as jest.Mock).mockReturnValue({
      getETHReadProvider: () => Promise.resolve(defaultReadProvider),
      getETHWriteProvider: () => Promise.resolve(defaultWriteProvider),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should initialize SDK', async () => {
    const sdk = await MaticPolygonSDK.getInstance();

    expect(sdk).toBeDefined();
  });

  test('should initialize SDK with user providers', async () => {
    const sdk = await MaticPolygonSDK.getInstance({
      readProvider: defaultReadProvider as unknown as Web3KeyReadProvider,
      writeProvider: defaultWriteProvider as unknown as Web3KeyWriteProvider,
    });

    expect(sdk).toBeDefined();
  });

  test('should add bond token to wallet without connect', async () => {
    defaultWriteProvider.isConnected.mockReturnValue(true);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.addTokenToWallet(TOKEN_BOND);

    expect(data).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0x219316af7edd3870a2ca71dea38c7ebcfb3b3dc0',
      chainId: POLYGON_NETWORK_BY_ENV,
      decimals: MATIC_DECIMALS,
      symbol: TOKEN_BOND,
    } as ITokenInfo);
  });

  test('should add certificate token to wallet without connect', async () => {
    defaultWriteProvider.isConnected.mockReturnValue(true);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.addTokenToWallet(TOKEN_CERT);

    expect(data).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0xac32206a73c8406d74eb21cf7bd060bf841e64ad',
      chainId: POLYGON_NETWORK_BY_ENV,
      decimals: MATIC_DECIMALS,
      symbol: TOKEN_CERT,
    } as ITokenInfo);
  });

  test('should add bond token to wallet with connect', async () => {
    defaultWriteProvider.isConnected.mockReturnValue(false);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.addTokenToWallet(TOKEN_BOND);

    expect(data).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0x219316af7edd3870a2ca71dea38c7ebcfb3b3dc0',
      chainId: POLYGON_NETWORK_BY_ENV,
      decimals: MATIC_DECIMALS,
      symbol: TOKEN_BOND,
    } as ITokenInfo);
  });

  test('should add certificate token to wallet with connect', async () => {
    defaultWriteProvider.isConnected.mockReturnValue(false);
    defaultWriteProvider.addTokenToWallet.mockReturnValue(true);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.addTokenToWallet(TOKEN_CERT);

    expect(data).toBe(true);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledTimes(1);
    expect(defaultWriteProvider.addTokenToWallet).toBeCalledWith({
      address: '0xac32206a73c8406d74eb21cf7bd060bf841e64ad',
      chainId: POLYGON_NETWORK_BY_ENV,
      decimals: MATIC_DECIMALS,
      symbol: TOKEN_CERT,
    } as ITokenInfo);
  });

  test('should return "false" on approve certificate token', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({
          call: (): string => '0',
        }),
        approve: () => ({
          estimateGas: (): Promise<BigNumber> => Promise.resolve(ONE),
          send: (): undefined => undefined,
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
      Promise.resolve(ONE),
    );

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.approveACToken(ONE);

    expect(data).toBe(false);
  });

  test('should approve certificate token', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({
          call: (): string => '0',
        }),
        approve: () => ({
          estimateGas: (): Promise<BigNumber> => Promise.resolve(ONE),
          send: (): TransactionReceipt => TX_RECEIPT,
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
      Promise.resolve(ONE),
    );

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.approveACToken(ONE);

    expect(data).toBe(true);
  });

  test('should approve certificate token if approved', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        allowance: () => ({
          call: (): string => `${2 * MATIC_SCALE_FACTOR}`,
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.approveACToken(ONE);

    expect(data).toBe(true);
  });

  test('should return token balances', async () => {
    const result = '0.000000000000000007';

    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: () => ({
          call: (): string => '7',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const abBalance = await sdk.getABBalance();
    const acBalance = await sdk.getACBalance();

    expect(abBalance.toString(10)).toBe(result);
    expect(acBalance.toString(10)).toBe(result);
  });

  test('should return zero certificate pool liquidity data if "cerosTokenAmount" is zero', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        cerosTokenAmount: () => ({
          call: (): string => '0',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getACPoolLiquidity();

    expect(data).toBe(ZERO);
  });

  test('should return correct certificate pool liquidity data', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        cerosTokenAmount: () => ({
          call: (): string => '47',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getACPoolLiquidity();

    expect(data.toString(10)).toBe('0.000000000000000047');
  });

  describe('should return zero certificate pool liquidity data in MATIC if some internal data are invalid', () => {
    test('should return zero data if "cerosTokenAmount" is negative', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          cerosTokenAmount: () => ({
            call: (): string => '-1',
          }),
          ratio: () => ({
            call: (): string => '1000',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getACPoolLiquidityInMATIC();

      expect(data).toBe(ZERO);
    });

    test('should return zero data if "ratio" is negative', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          cerosTokenAmount: () => ({
            call: (): string => '56',
          }),
          ratio: () => ({
            call: (): string => '-1',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getACPoolLiquidityInMATIC();

      expect(data).toBe(ZERO);
    });

    test('should return zero data if "cerosTokenAmount" is zero', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          cerosTokenAmount: () => ({
            call: (): string => '0',
          }),
          ratio: () => ({
            call: (): string => '1000',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getACPoolLiquidityInMATIC();

      expect(data).toBe(ZERO);
    });

    test('should return zero data if "ratio" is zero', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          cerosTokenAmount: () => ({
            call: (): string => '56',
          }),
          ratio: () => ({
            call: (): string => '0',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getACPoolLiquidityInMATIC();

      expect(data).toBe(ZERO);
    });
  });

  test('should return correct certificate pool liquidity data in MATIC', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        cerosTokenAmount: () => ({
          call: (): string => '34',
        }),
        ratio: () => ({
          call: (): string => '10000',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getACPoolLiquidityInMATIC();

    expect(data.toString(10)).toBe('0.0034');
  });

  test('should return certificate ratio', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        ratio: () => ({
          call: (): string => '1',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const acRatio = await sdk.getACRatio();

    expect(acRatio.toString(10)).toBe('0.000000000000000001');
  });

  test('should return matic balance', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: () => ({
          call: (): string => '9',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getMaticBalance();

    expect(data.toString(10)).toBe('0.000000000000000009');
  });

  describe('should return zero MATIC pool liquidity data as certificates if some internal data are invalid', () => {
    test('should return zero data if "nativeTokenAmount" is negative', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          nativeTokenAmount: () => ({
            call: (): string => '-1',
          }),
          ratio: () => ({
            call: (): string => '1000',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getMATICPoolLiquidityInAC();

      expect(data).toBe(ZERO);
    });

    test('should return zero data if "ratio" is negative', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          nativeTokenAmount: () => ({
            call: (): string => '7',
          }),
          ratio: () => ({
            call: (): string => '-1',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getMATICPoolLiquidityInAC();

      expect(data).toBe(ZERO);
    });

    test('should return zero data if "nativeTokenAmount" is zero', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          nativeTokenAmount: () => ({
            call: (): string => '0',
          }),
          ratio: () => ({
            call: (): string => '1000',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getMATICPoolLiquidityInAC();

      expect(data).toBe(ZERO);
    });

    test('should return zero data if "ratio" is zero', async () => {
      const contract = {
        ...defaultContract,
        methods: {
          nativeTokenAmount: () => ({
            call: (): string => '5',
          }),
          ratio: () => ({
            call: (): string => '0',
          }),
        },
      };

      defaultWeb3.eth.Contract.mockReturnValue(contract);

      const sdk = await MaticPolygonSDK.getInstance();
      const data = await sdk.getMATICPoolLiquidityInAC();

      expect(data).toBe(ZERO);
    });
  });

  test('should return correct MATIC pool liquidity data as certificates', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        nativeTokenAmount: () => ({
          call: (): string => `${24 * MATIC_SCALE_FACTOR}`,
        }),
        ratio: () => ({
          call: (): string => '10000',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getMATICPoolLiquidityInAC();

    expect(data.toString(10)).toBe('0.00000000000024');
  });

  test('should return minimum stake data', async () => {
    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getMinimumStake();

    expect(data).toBe(ZERO);
  });

  test('should return pending claim data', async () => {
    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getPendingClaim();

    expect(data).toBe(ZERO);
  });

  test('should return pending data', async () => {
    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getPendingData();

    expect(data).toStrictEqual({
      pendingBond: ZERO,
      pendingCertificate: ZERO,
    } as IPendingData);
  });

  test('should return zero stake fee data if "stakeFee" is zero', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        FEE_MAX: () => ({
          call: (): string => FEE_MAX,
        }),
        stakeFee: () => ({
          call: (): string => '0',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getStakeFeePct();

    expect(data).toBe(ZERO);
  });

  test('should return correct stake fee data', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        FEE_MAX: () => ({
          call: (): string => FEE_MAX,
        }),
        stakeFee: () => ({
          call: (): string => '100',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getStakeFeePct();

    expect(data.toString(10)).toBe('0.1');
  });

  test('should return stake gas fee data', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        swapEth: () => ({
          estimateGas: (): Promise<BigNumber> => Promise.resolve(ONE),
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    defaultWriteProvider.getContractMethodFee.mockReturnValue(
      Promise.resolve(ONE),
    );

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getStakeGasFee(ONE, TOKEN_CERT);

    expect(data).toBe(ONE);
  });

  test('should return transaction data if "targetTokenAddr" is unavailable', async () => {
    defaultWeb3.eth.getTransactionReceipt.mockReturnValue(
      Promise.resolve({
        from: TX_ADDR,
        logs: [
          {
            address: polygonConfig.aMATICbToken,
            data: `${MATIC_SCALE_FACTOR}`,
          } as Log,
        ],
        status: true,
      }),
    );

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getTxData(polygonConfig.aMATICcToken, TX_HASH);

    expect(data).toStrictEqual({
      amount: ZERO,
      destinationAddress: TX_ADDR,
      isPending: false,
      status: true,
    } as IGetTxData);
  });

  test('should return transaction data', async () => {
    defaultWeb3.eth.getTransactionReceipt.mockReturnValue(
      Promise.resolve({
        from: TX_ADDR,
        logs: [
          {
            address: polygonConfig.aMATICcToken,
            data: `${MATIC_SCALE_FACTOR}`,
          } as Log,
        ],
        status: true,
      }),
    );

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getTxData(polygonConfig.aMATICcToken, TX_HASH);

    expect(data).toStrictEqual({
      amount: ONE,
      destinationAddress: TX_ADDR,
      isPending: false,
      status: true,
    } as IGetTxData);
  });

  test('should return events history data', async () => {
    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getTxEventsHistory();

    expect(data).toStrictEqual({
      completedBond: [],
      completedCertificate: [],
      pendingBond: [],
      pendingCertificate: [],
      unstakeBond: [],
      unstakeCertificate: [],
    } as ITxEventsHistoryData);
  });

  test('should return transaction receipt', async () => {
    defaultWeb3.eth.getTransactionReceipt.mockReturnValue(TX_HASH);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getTxReceipt(TX_HASH);

    expect(data).toBe(TX_HASH);
  });

  test('should return zero unstake fee data if "unstakeFee" is zero', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        FEE_MAX: () => ({
          call: (): string => FEE_MAX,
        }),
        unstakeFee: () => ({
          call: (): string => '0',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getUnstakeFeePct();

    expect(data).toBe(ZERO);
  });

  test('should return correct unstake fee data', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        FEE_MAX: () => ({
          call: (): string => FEE_MAX,
        }),
        unstakeFee: () => ({
          call: (): string => '1000',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.getUnstakeFeePct();

    expect(data.toString(10)).toBe('1');
  });

  test('should throw error if stake amount is less than or equals to zero', async () => {
    const sdk = await MaticPolygonSDK.getInstance();

    expect(sdk.stake(ZERO, TOKEN_CERT)).rejects.toThrow(
      EMaticSDKErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should throw error if "maxAllowedAmount" in stake is less than or equals to zero', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: () => ({
          call: (): string => '0',
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    const sdk = await MaticPolygonSDK.getInstance();

    expect(sdk.stake(ONE, TOKEN_CERT)).rejects.toThrow(
      EMaticSDKErrorCodes.INSUFFICIENT_BALANCE,
    );
  });

  test('should stake tokens if amount is greater than "maxAllowedAmount"', async () => {
    const value = new BigNumber(10).multipliedBy(MATIC_SCALE_FACTOR);

    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: () => ({
          call: (): string => value.toString(10),
        }),
        swapEth: () => ({
          estimateGas: (): Promise<BigNumber> => Promise.resolve(ONE),
          send: () => ({
            transactionHash: TX_HASH,
          }),
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    defaultWriteProvider.getContractMethodFee.mockReturnValue(
      Promise.resolve(ONE),
    );

    defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
      Promise.resolve(ONE),
    );

    defaultWriteProvider.isConnected.mockReturnValue(false);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.stake(value, TOKEN_CERT);

    expect(data).toStrictEqual({ txHash: TX_HASH } as IStakeData);
  });

  test('should stake tokens', async () => {
    const contract = {
      ...defaultContract,
      methods: {
        balanceOf: () => ({
          call: (): string => `${12 * MATIC_SCALE_FACTOR}`,
        }),
        swapEth: () => ({
          estimateGas: (): Promise<BigNumber> =>
            Promise.resolve(ONE.multipliedBy(100)),
          send: () => ({
            transactionHash: TX_HASH,
          }),
        }),
      },
    };

    defaultWeb3.eth.Contract.mockReturnValue(contract);

    defaultWriteProvider.getContractMethodFee.mockReturnValue(
      Promise.resolve(ONE),
    );

    defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
      Promise.resolve(ONE),
    );

    defaultWriteProvider.isConnected.mockReturnValue(false);

    const sdk = await MaticPolygonSDK.getInstance();
    const data = await sdk.stake(ONE, TOKEN_CERT);

    expect(data).toStrictEqual({ txHash: TX_HASH } as IStakeData);
  });

  test('should throw error if unstake amount is less than or equals to zero', async () => {
    const sdk = await MaticPolygonSDK.getInstance();

    expect(sdk.unstake(ZERO, TOKEN_CERT)).rejects.toThrow(
      EMaticSDKErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should unstake tokens', async () => {
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

    defaultWriteProvider.getSafeGasPriceWei.mockReturnValue(
      Promise.resolve(ONE),
    );

    defaultWriteProvider.isConnected.mockReturnValue(false);

    const sdk = await MaticPolygonSDK.getInstance();

    await sdk.unstake(ONE, TOKEN_CERT);

    expect(contract.methods.swapEth).toBeCalledTimes(1);
  });
});
