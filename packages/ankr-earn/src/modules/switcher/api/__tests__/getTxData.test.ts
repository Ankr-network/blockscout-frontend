import { EEthereumNetworkId } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import {
  AvalancheSDK,
  BinanceSDK,
  EthereumSDK,
  FantomSDK,
  PolygonOnEthereumSDK,
} from '@ankr.com/staking-sdk';

import { ZERO_ADDR } from 'modules/common/const';
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
    (EthereumSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);

    (PolygonOnEthereumSDK.getInstance as jest.Mock).mockReturnValue(
      defaultMaticSDK,
    );

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
