import BigNumber from 'bignumber.js';

import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
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

describe('modules/switcher/api/SwitcherSDK#lockShares', () => {
  const defaultEthSDK = {
    lockShares: () => Promise.resolve({}),
  };

  const defaultBinanceSDK = {
    lockShares: () => Promise.resolve({}),
  };

  const defaultMaticSDK = {
    lockShares: () => Promise.resolve({}),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);

    (PolygonSDK.getInstance as jest.Mock).mockReturnValue(defaultMaticSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should lock shares on ethereum network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(
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
      [
        BlockchainNetworkId.smartchain,
        BlockchainNetworkId.smartchainTestnet,
      ].map(async chainId =>
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
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(
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
