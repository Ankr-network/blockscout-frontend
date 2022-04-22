import BigNumber from 'bignumber.js';

import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { ZERO } from 'modules/common/const';
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

describe('modules/switcher/api/SwitcherSDK#getCommonData', () => {
  const defaultEthSDK = {
    getABBalance: () => Promise.resolve(new BigNumber(2.1)),
    getACBalance: () => Promise.resolve(new BigNumber(1.5)),
    getACRatio: () => Promise.resolve(new BigNumber(1)),
    getACAllowance: () => Promise.resolve(ZERO),
  };

  const defaultBinanceSDK = {
    getABBalance: () => Promise.resolve(new BigNumber(0.42)),
    getACBalance: () => Promise.resolve(new BigNumber(24.6)),
    getACRatio: () => Promise.resolve(new BigNumber(0.65)),
    getACAllowance: () => Promise.resolve(ZERO),
  };

  const defaultMaticSDK = {
    getABBalance: () => Promise.resolve(new BigNumber(4.12)),
    getACBalance: () => Promise.resolve(new BigNumber(12.3)),
    getACRatio: () => Promise.resolve(new BigNumber(0.65)),
    getACAllowance: () => Promise.resolve(ZERO),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);

    (PolygonSDK.getInstance as jest.Mock).mockReturnValue(defaultMaticSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return common data for ethereum network', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      acBalance: new BigNumber(1.5),
      abBalance: new BigNumber(2.1),
      ratio: new BigNumber(1),
      allowance: ZERO,
    };

    const results = await Promise.all(
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(chainId =>
        sdk.getCommonData({
          chainId: chainId as AvailableSwitchNetwork,
          token: Token.aETHb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should return common data for binance network', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      abBalance: new BigNumber(0.42),
      acBalance: new BigNumber(24.6),
      ratio: new BigNumber(0.65),
      allowance: ZERO,
    };

    const results = await Promise.all(
      [
        BlockchainNetworkId.smartchainTestnet,
        BlockchainNetworkId.smartchain,
      ].map(chainId =>
        sdk.getCommonData({
          chainId: chainId as AvailableSwitchNetwork,
          token: Token.aBNBb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should return common data for matic token', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      abBalance: new BigNumber(4.12),
      acBalance: new BigNumber(12.3),
      ratio: new BigNumber(0.65),
      allowance: ZERO,
    };

    const results = await Promise.all(
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(chainId =>
        sdk.getCommonData({
          chainId: chainId as AvailableSwitchNetwork,
          token: Token.aMATICb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should not return common data for unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const data = await sdk.getCommonData({
      chainId: 9000 as AvailableSwitchNetwork,
      token: Token.aETHb,
    });

    expect(data).toBeUndefined();
  });
});
