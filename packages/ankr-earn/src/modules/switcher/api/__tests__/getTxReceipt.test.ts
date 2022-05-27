import { EEthereumNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { FantomSDK } from 'modules/stake-fantom/api/sdk';
import { PolygonSDK } from 'modules/stake-polygon/api/PolygonSDK';
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

jest.mock('modules/stake-fantom/api/sdk', () => ({
  FantomSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK#getTxReceipt', () => {
  const defaultSDK = {
    fetchTxReceipt: () => Promise.resolve({}),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (PolygonSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);

    (FantomSDK.getInstance as jest.Mock).mockReturnValue(defaultSDK);
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
