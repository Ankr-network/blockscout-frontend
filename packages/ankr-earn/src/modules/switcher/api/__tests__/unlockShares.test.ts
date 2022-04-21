import BigNumber from 'bignumber.js';

import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
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

describe('modules/switcher/api/SwitcherSDK#unlockShares', () => {
  const defaultEthSDK = {
    unlockShares: jest.fn(),
  };

  const defaultBinanceSDK = {
    unlockShares: jest.fn(),
  };

  beforeEach(() => {
    (defaultEthSDK.unlockShares as jest.Mock).mockResolvedValue({});

    (defaultBinanceSDK.unlockShares as jest.Mock).mockResolvedValue({});

    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);
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
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(
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
      [
        BlockchainNetworkId.smartchainTestnet,
        BlockchainNetworkId.smartchain,
      ].map(async chainId =>
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
