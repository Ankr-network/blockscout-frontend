import { EEthereumNetworkId } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import {
  AvalancheSDK,
  BinanceSDK,
  EthereumSDK,
  FantomSDK,
  PolygonOnEthereumSDK,
} from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { AvailableSwitchNetwork } from 'modules/switcher/const';

import { SwitcherSDK } from '../SwitcherSDK';

jest.mock('@ankr.com/staking-sdk', (): unknown => ({
  ...jest.requireActual('@ankr.com/staking-sdk'),
  AvalancheSDK: { getInstance: jest.fn() },
  BinanceSDK: { getInstance: jest.fn() },
  EthereumSDK: { getInstance: jest.fn() },
  FantomSDK: { getInstance: jest.fn() },
  PolygonOnEthereumSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK#lockShares', () => {
  const defaultSDK = {
    lockShares: () => Promise.resolve({}),
  };

  beforeEach(() => {
    (EthereumSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (PolygonOnEthereumSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (FantomSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (AvalancheSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should lock shares on ethereum network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(
        async chainId =>
          sdk.lockShares({
            chainId: chainId as AvailableSwitchNetwork,
            amount: new BigNumber(1),
            token: Token.aETHb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should lock shares on binance network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.smartchain, EEthereumNetworkId.smartchainTestnet].map(
        async chainId =>
          sdk.lockShares({
            chainId: chainId as AvailableSwitchNetwork,
            amount: new BigNumber(1),
            token: Token.aBNBc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should lock shares on ethereum network for matic properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(
        async chainId =>
          sdk.lockShares({
            chainId: chainId as AvailableSwitchNetwork,
            amount: new BigNumber(1),
            token: Token.aMATICc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should lock shares on fantom network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.fantom, EEthereumNetworkId.fantomTestnet].map(
        async chainId =>
          sdk.lockShares({
            chainId: chainId as AvailableSwitchNetwork,
            amount: new BigNumber(1),
            token: Token.aFTMc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should lock shares on avalanche network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.avalanche, EEthereumNetworkId.avalancheTestnet].map(
        async chainId =>
          sdk.lockShares({
            chainId: chainId as AvailableSwitchNetwork,
            amount: new BigNumber(1),
            token: Token.aAVAXc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should not lock shares on unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.lockShares({
      chainId: 9000 as AvailableSwitchNetwork,
      amount: new BigNumber(1),
      token: Token.aETHb,
    });

    expect(result).toBeUndefined();
  });
});
