import { EEthereumNetworkId } from '@ankr.com/provider';

import { PolygonSDK, BinanceSDK } from '@ankr.com/staking-sdk';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { AvalancheSDK } from 'modules/stake-avax/api/AvalancheSDK';
import { FantomSDK } from 'modules/stake-fantom/api/sdk';
import {
  AvailableSwitchNetwork,
  AvailableSwitcherToken,
} from 'modules/switcher/const';

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

describe('modules/switcher/api/SwitcherSDK#addTokenToWallet', () => {
  const defaultSDK = {
    addTokenToWallet: () => Promise.resolve(true),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (PolygonSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (FantomSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (AvalancheSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should add token to wallet on ethereum network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(
        async chainId =>
          sdk.addTokenToWallet({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aETHb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBe(true);
    });
  });

  test('should add token to wallet on binance network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.smartchainTestnet, EEthereumNetworkId.smartchain].map(
        async chainId =>
          sdk.addTokenToWallet({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aBNBb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBe(true);
    });
  });

  test('should add matic token to wallet on ethereum network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(
        async chainId =>
          sdk.addTokenToWallet({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aMATICb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBe(true);
    });
  });

  test('should add token to wallet on fantom network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.fantom, EEthereumNetworkId.fantomTestnet].map(
        async chainId =>
          sdk.addTokenToWallet({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aFTMc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBe(true);
    });
  });

  test('should add token to wallet on avalanche network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.avalanche, EEthereumNetworkId.avalanche].map(
        async chainId =>
          sdk.addTokenToWallet({
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aAVAXc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBe(true);
    });
  });

  test('should not add token to wallet on unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.addTokenToWallet({
      chainId: 9000 as AvailableSwitchNetwork,
      token: Token.aETHb,
    });

    expect(result).toBe(false);
  });

  test('should not add unsupported token', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.addTokenToWallet({
      chainId: EEthereumNetworkId.goerli,
      token: 'token' as AvailableSwitcherToken,
    });

    expect(result).toBe(false);
  });
});
