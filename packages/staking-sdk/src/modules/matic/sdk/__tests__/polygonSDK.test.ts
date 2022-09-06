import {
  EEthereumNetworkId,
  ProviderManager,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { ZERO } from '../../../common';
import { IPendingData } from '../../../stake';
import { EMaticSDKErrorCodes } from '../../types';
import { MaticPolygonSDK } from '../polygonSDK';

jest.mock('@ankr.com/provider', () => ({
  ...jest.requireActual('@ankr.com/provider'),
  ProviderManager: jest.fn(),
}));

describe('modules/matic/sdk/polygonSDK', () => {
  const defaultWeb3 = {
    eth: {
      getChainId: jest.fn(),
    },
  };

  const defaultReadProvider = {
    getWeb3: jest.fn(),
  };

  const defaultWriteProvider = {
    ...defaultReadProvider,
    connect: jest.fn(),
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

  test('should throw error if stake amount is less than or equals to zero', async () => {
    const sdk = await MaticPolygonSDK.getInstance();

    expect(sdk.stake(ZERO, 'aMATICc')).rejects.toThrow(
      EMaticSDKErrorCodes.ZERO_AMOUNT,
    );
  });

  test('should throw error if unstake amount is less than or equals to zero', async () => {
    const sdk = await MaticPolygonSDK.getInstance();

    expect(sdk.unstake(ZERO, 'aMATICc')).rejects.toThrow(
      EMaticSDKErrorCodes.ZERO_AMOUNT,
    );
  });
});
