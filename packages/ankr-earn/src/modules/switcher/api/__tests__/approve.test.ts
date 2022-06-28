import { PolygonSDK, BinanceSDK } from '@ankr.com/staking-sdk';
import { EEthereumNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { AvalancheSDK } from 'modules/stake-avax/api/AvalancheSDK';
import { FantomSDK } from 'modules/stake-fantom/api/sdk';
import { AvailableSwitchNetwork } from 'modules/switcher/const';

import { SwitcherSDK } from '../SwitcherSDK';

jest.mock('modules/api/EthSDK', () => ({
  EthSDK: { getInstance: jest.fn() },
}));

jest.mock('@ankr.com/staking-sdk', (): unknown => ({
  ...jest.requireActual('@ankr.com/staking-sdk'),
  PolygonSDK: { getInstance: jest.fn() },
  BinanceSDK: { getInstance: jest.fn() },
}));

jest.mock('modules/stake-fantom/api/sdk', () => ({
  FantomSDK: { getInstance: jest.fn() },
}));

jest.mock('modules/stake-avax/api/AvalancheSDK', () => ({
  AvalancheSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK#approve', () => {
  const defaultEthSDK = {
    approveACForAB: () => Promise.resolve({ value: 'ethereum' }),
  };

  const defaultBinanceSDK = {
    approveACForAB: () => Promise.resolve({ value: 'binance' }),
  };

  const defaultMaticSDK = {
    approveACForAB: () => Promise.resolve({ value: 'matic' }),
  };

  const defaultFantomSDK = {
    approveACForAB: () => Promise.resolve({ value: 'fantom' }),
  };

  const defaultAvaxSDK = {
    approveACForAB: () => Promise.resolve({ value: 'avalanche' }),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);

    (PolygonSDK.getInstance as jest.Mock).mockReturnValue(defaultMaticSDK);

    (FantomSDK.getInstance as jest.Mock).mockReturnValue(defaultFantomSDK);

    (AvalancheSDK.getInstance as jest.Mock).mockReturnValue(defaultAvaxSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should approve certificate for bond on ethereum network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(chainId =>
        sdk.approve({
          chainId: chainId as AvailableSwitchNetwork,
          token: Token.aETHb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual({ value: 'ethereum' });
    });
  });

  test('should approve certificate for bond on binance network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.smartchain, EEthereumNetworkId.smartchainTestnet].map(
        chainId =>
          sdk.approve({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aBNBb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual({ value: 'binance' });
    });
  });

  test('should approve certificate for bond on ethereum network (matic)', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(chainId =>
        sdk.approve({
          chainId: chainId as AvailableSwitchNetwork,
          token: Token.aMATICc,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual({ value: 'matic' });
    });
  });

  test('should approve certificate for bond on fantom network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.fantom, EEthereumNetworkId.fantomTestnet].map(
        chainId =>
          sdk.approve({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aFTMb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual({ value: 'fantom' });
    });
  });

  test('should approve certificate for bond on avalanche network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.avalanche, EEthereumNetworkId.avalancheTestnet].map(
        chainId =>
          sdk.approve({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aAVAXb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual({ value: 'avalanche' });
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
