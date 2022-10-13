import {
  AvalancheSDK,
  BinanceSDK,
  EthereumSDK,
  FantomSDK,
  PolygonOnEthereumSDK,
} from '@ankr.com/staking-sdk';
import { EEthereumNetworkId } from 'common';

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

describe('modules/switcher/api/SwitcherSDK#getTxReceipt', () => {
  const defaultSDK = {
    fetchTxReceipt: () => Promise.resolve({}),
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

  test('should return tx receipt for ethereum network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(chainId =>
        sdk.fetchTxReceipt({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
          token: Token.aETHb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should return tx receipt for binance network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.smartchainTestnet, EEthereumNetworkId.smartchain].map(
        chainId =>
          sdk.fetchTxReceipt({
            chainId: chainId as AvailableSwitchNetwork,
            txHash: 'hash',
            token: Token.aBNBb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should return tx receipt for ethereum network for matic token', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(chainId =>
        sdk.fetchTxReceipt({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
          token: Token.aMATICc,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should return tx receipt for fantom network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.fantom, EEthereumNetworkId.fantomTestnet].map(
        chainId =>
          sdk.fetchTxReceipt({
            chainId: chainId as AvailableSwitchNetwork,
            txHash: 'hash',
            token: Token.aFTMc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should return tx receipt for avalanche network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [EEthereumNetworkId.avalanche, EEthereumNetworkId.avalancheTestnet].map(
        chainId =>
          sdk.fetchTxReceipt({
            chainId: chainId as AvailableSwitchNetwork,
            txHash: 'hash',
            token: Token.aAVAXc,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should not return tx receipt for unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.fetchTxReceipt({
      chainId: 9000 as AvailableSwitchNetwork,
      txHash: 'hash',
      token: Token.aBNBb,
    });

    expect(result).toBeUndefined();
  });
});
