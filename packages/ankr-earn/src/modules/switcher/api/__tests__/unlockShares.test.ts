import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from '@ankr.com/provider';
import {
  PolygonSDK,
  BinanceSDK,
  EthereumSDK,
  AvalancheSDK,
  FantomSDK,
} from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { AvailableSwitchNetwork } from 'modules/switcher/const';

import { SwitcherSDK } from '../SwitcherSDK';

jest.mock('@ankr.com/staking-sdk', (): unknown => ({
  ...jest.requireActual('@ankr.com/staking-sdk'),
  PolygonSDK: { getInstance: jest.fn() },
  EthereumSDK: { getInstance: jest.fn() },
  BinanceSDK: { getInstance: jest.fn() },
  AvalancheSDK: { getInstance: jest.fn() },
  FantomSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK#unlockShares', () => {
  const defaultEthSDK = {
    unlockShares: jest.fn(),
  };

  const defaultBinanceSDK = {
    unlockShares: jest.fn(),
  };

  const defaultMaticSDK = {
    unlockShares: jest.fn(),
  };

  const defaultFantomSDK = {
    unlockShares: jest.fn(),
  };

  beforeEach(() => {
    (defaultEthSDK.unlockShares as jest.Mock).mockResolvedValue({});

    (defaultBinanceSDK.unlockShares as jest.Mock).mockResolvedValue({});

    (defaultMaticSDK.unlockShares as jest.Mock).mockResolvedValue({});

    (defaultFantomSDK.unlockShares as jest.Mock).mockResolvedValue({});

    (EthereumSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);

    (PolygonSDK.getInstance as jest.Mock).mockReturnValue(defaultMaticSDK);

    (FantomSDK.getInstance as jest.Mock).mockReturnValue(defaultFantomSDK);

    (AvalancheSDK.getInstance as jest.Mock).mockReturnValue(defaultFantomSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should unlock shares on ethereum network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const params = {
      amount: new BigNumber(1),
      ratio: new BigNumber(0.64),
    };

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(
        async chainId =>
          sdk.unlockShares({
            ...params,
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aETHb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });

    expect(defaultEthSDK.unlockShares).toBeCalledTimes(2);
    expect(defaultEthSDK.unlockShares).toHaveBeenNthCalledWith(1, {
      amount: params.amount.multipliedBy(params.ratio),
    });
    expect(defaultEthSDK.unlockShares).toHaveBeenNthCalledWith(2, {
      amount: params.amount.multipliedBy(params.ratio),
    });
  });

  test('should unlock shares on binance network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const params = {
      amount: new BigNumber(1),
      ratio: new BigNumber(1),
    };

    const results = await Promise.all(
      [EEthereumNetworkId.smartchainTestnet, EEthereumNetworkId.smartchain].map(
        async chainId =>
          sdk.unlockShares({
            ...params,
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aBNBb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });

    expect(defaultBinanceSDK.unlockShares).toBeCalledTimes(2);
    expect(defaultBinanceSDK.unlockShares).toHaveBeenNthCalledWith(1, {
      amount: params.amount.multipliedBy(params.ratio),
    });
    expect(defaultBinanceSDK.unlockShares).toHaveBeenNthCalledWith(2, {
      amount: params.amount.multipliedBy(params.ratio),
    });
  });

  test('should unlock shares on ethereum network for matic properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const params = {
      amount: new BigNumber(1),
      ratio: new BigNumber(0.64),
    };

    const results = await Promise.all(
      [EEthereumNetworkId.goerli, EEthereumNetworkId.mainnet].map(
        async chainId =>
          sdk.unlockShares({
            ...params,
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aMATICb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });

    expect(defaultMaticSDK.unlockShares).toBeCalledTimes(2);
    expect(defaultMaticSDK.unlockShares).toHaveBeenNthCalledWith(1, {
      amount: params.amount.multipliedBy(params.ratio),
    });
    expect(defaultMaticSDK.unlockShares).toHaveBeenNthCalledWith(2, {
      amount: params.amount.multipliedBy(params.ratio),
    });
  });

  test('should unlock shares on fantom network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const params = {
      amount: new BigNumber(1),
      ratio: new BigNumber(1),
    };

    const results = await Promise.all(
      [EEthereumNetworkId.fantom, EEthereumNetworkId.fantomTestnet].map(
        async chainId =>
          sdk.unlockShares({
            ...params,
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aFTMb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });

    expect(defaultFantomSDK.unlockShares).toBeCalledTimes(2);
    expect(defaultFantomSDK.unlockShares).toHaveBeenNthCalledWith(1, {
      amount: params.amount.multipliedBy(params.ratio),
    });
    expect(defaultFantomSDK.unlockShares).toHaveBeenNthCalledWith(2, {
      amount: params.amount.multipliedBy(params.ratio),
    });
  });

  test('should unlock shares on avalanche network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const params = {
      amount: new BigNumber(1),
      ratio: new BigNumber(1),
    };

    const results = await Promise.all(
      [EEthereumNetworkId.avalanche, EEthereumNetworkId.avalancheTestnet].map(
        async chainId =>
          sdk.unlockShares({
            ...params,
            chainId: chainId as AvailableSwitchNetwork,
            token: Token.aAVAXb,
          }),
      ),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });

    expect(defaultFantomSDK.unlockShares).toBeCalledTimes(2);
    expect(defaultFantomSDK.unlockShares).toHaveBeenNthCalledWith(1, {
      amount: params.amount.multipliedBy(params.ratio),
    });
    expect(defaultFantomSDK.unlockShares).toHaveBeenNthCalledWith(2, {
      amount: params.amount.multipliedBy(params.ratio),
    });
  });

  test('should not unlock shares on unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.unlockShares({
      chainId: 9000 as AvailableSwitchNetwork,
      amount: new BigNumber(1),
      ratio: new BigNumber(1),
      token: Token.aBNBb,
    });

    expect(result).toBeUndefined();
  });
});
