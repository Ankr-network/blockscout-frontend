import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { AvailableSwitchNetwork } from 'modules/switcher/const';

import { SwitcherSDK } from '../SwitcherSDK';

jest.mock('modules/api/EthSDK', () => ({
  EthSDK: { getInstance: jest.fn() },
}));

jest.mock('modules/stake-bnb/api/BinanceSDK', () => ({
  BinanceSDK: { getInstance: jest.fn() },
}));

jest.mock('modules/stake-polygon/api/PolygonSDK', () => ({
  PolygonSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK#approve', () => {
  const defaultEthSDK = {
    approveACForAB: () => Promise.resolve({}),
  };

  const defaultBinanceSDK = {
    approveACForAB: () => Promise.resolve({}),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should approve certificate for bond on ethereum network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(chainId =>
        sdk.approve({
          chainId: chainId as AvailableSwitchNetwork,
          token: Token.aETHb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should approve certificate for bond on binance network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [
        BlockchainNetworkId.smartchain,
        BlockchainNetworkId.smartchainTestnet,
      ].map(chainId =>
        sdk.approve({
          chainId: chainId as AvailableSwitchNetwork,
          token: Token.aBNBb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should not approve certificate for bond on unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.approve({
      chainId: 9000 as AvailableSwitchNetwork,
      token: Token.aETHb,
    });

    expect(result).toBeUndefined();
  });
});
