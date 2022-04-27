import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { FantomSDK } from 'modules/stake-fantom/api/sdk';
import { PolygonSDK } from 'modules/stake-polygon/api/PolygonSDK';
import {
  AvailableSwitchNetwork,
  AvailableSwitcherToken,
} from 'modules/switcher/const';

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

describe('modules/switcher/api/SwitcherSDK#addTokenToWallet', () => {
  const defaultSDK = {
    addTokenToWallet: () => Promise.resolve(true),
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

  test('should add token to wallet on ethereum network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(
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
      [
        BlockchainNetworkId.smartchainTestnet,
        BlockchainNetworkId.smartchain,
      ].map(async chainId =>
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
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(
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
      [BlockchainNetworkId.fantom, BlockchainNetworkId.fantomTestnet].map(
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
      chainId: BlockchainNetworkId.goerli,
      token: 'token' as AvailableSwitcherToken,
    });

    expect(result).toBe(false);
  });
});
