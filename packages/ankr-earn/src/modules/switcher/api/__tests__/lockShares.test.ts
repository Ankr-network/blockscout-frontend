import { EEthereumNetworkId } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';

import { PolygonSDK, BinanceSDK } from '@ankr.com/staking-sdk';

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

describe('modules/switcher/api/SwitcherSDK#lockShares', () => {
  const defaultSDK = {
    lockShares: () => Promise.resolve({}),
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
