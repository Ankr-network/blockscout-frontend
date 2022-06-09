import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { ZERO_ADDR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { AvalancheSDK } from 'modules/stake-avax/api/AvalancheSDK';
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

jest.mock('modules/stake-avax/api/AvalancheSDK', () => ({
  AvalancheSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK#getTxData', () => {
  const defaultEthSDK = {
    fetchTxData: () =>
      Promise.resolve({
        amount: new BigNumber(2),
        isPending: true,
        destinationAddress: ZERO_ADDR,
      }),
  };

  const defaultBinanceSDK = {
    fetchTxData: () =>
      Promise.resolve({
        amount: new BigNumber(2.5),
        isPending: false,
        destinationAddress: ZERO_ADDR,
      }),
  };

  const defaultMaticSDK = {
    fetchTxData: () =>
      Promise.resolve({
        amount: new BigNumber(0.5),
        isPending: true,
        destinationAddress: ZERO_ADDR,
      }),
  };

  const defaultFantomSDK = {
    fetchTxData: () =>
      Promise.resolve({
        amount: new BigNumber(1.5),
        isPending: false,
        destinationAddress: ZERO_ADDR,
      }),
  };

  const defaultAvaxSDK = {
    fetchTxData: () =>
      Promise.resolve({
        amount: new BigNumber(1.5),
        isPending: false,
        destinationAddress: ZERO_ADDR,
      }),
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

  test('should return tx data for ethereum network', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      amount: new BigNumber(2),
      isPending: true,
      destinationAddress: ZERO_ADDR,
    };

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(chainId =>
        sdk.fetchTxData({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
          token: Token.aETHb,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should return tx data for binance network', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      amount: new BigNumber(2.5),
      isPending: false,
      destinationAddress: ZERO_ADDR,
    };

    const results = await Promise.all(
      [EEthereumNetworkId.smartchainTestnet, EEthereumNetworkId.smartchain].map(
        chainId =>
          sdk.fetchTxData({
            chainId: chainId as AvailableSwitchNetwork,
            txHash: 'hash',
            token: Token.aBNBb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should return tx data for ethereum network for matic token', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      amount: new BigNumber(0.5),
      isPending: true,
      destinationAddress: ZERO_ADDR,
    };

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(chainId =>
        sdk.fetchTxData({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
          token: Token.aMATICc,
        }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should return tx data for fantom network', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      amount: new BigNumber(1.5),
      isPending: false,
      destinationAddress: ZERO_ADDR,
    };

    const results = await Promise.all(
      [EEthereumNetworkId.fantom, EEthereumNetworkId.fantomTestnet].map(
        chainId =>
          sdk.fetchTxData({
            chainId: chainId as AvailableSwitchNetwork,
            txHash: 'hash',
            token: Token.aFTMb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should return tx data for avalanche network', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      amount: new BigNumber(1.5),
      isPending: false,
      destinationAddress: ZERO_ADDR,
    };

    const results = await Promise.all(
      [EEthereumNetworkId.avalanche, EEthereumNetworkId.avalancheTestnet].map(
        chainId =>
          sdk.fetchTxData({
            chainId: chainId as AvailableSwitchNetwork,
            txHash: 'hash',
            token: Token.aAVAXb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toStrictEqual(expected);
    });
  });

  test('should not return tx data for unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.fetchTxData({
      chainId: 9000 as AvailableSwitchNetwork,
      txHash: 'hash',
      token: Token.aBNBb,
    });

    expect(result).toBeUndefined();
  });
});
