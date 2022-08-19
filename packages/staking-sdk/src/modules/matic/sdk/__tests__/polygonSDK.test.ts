import { EEthereumNetworkId, ProviderManager } from '@ankr.com/provider';

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

  test('should initialize sdk', async () => {
    const sdk = await MaticPolygonSDK.getInstance();

    expect(sdk).toBeDefined();
  });
});
