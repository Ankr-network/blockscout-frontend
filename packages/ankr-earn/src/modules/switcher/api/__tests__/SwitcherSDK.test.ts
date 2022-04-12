import BigNumber from 'bignumber.js';

import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { ZERO } from 'modules/common/const';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { AvailableSwitchNetwork } from 'modules/switcher/const';

import { SwitcherSDK } from '../SwitcherSDK';

jest.mock('modules/api/EthSDK', () => ({
  EthSDK: { getInstance: jest.fn() },
}));

jest.mock('modules/stake-bnb/api/BinanceSDK', () => ({
  BinanceSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK', () => {
  const defaultEthSDK = {
    getAethbBalance: () => Promise.resolve(new BigNumber(2.1)),
    getAethcBalance: () => Promise.resolve(new BigNumber(1.5)),
    getAethcRatio: () => Promise.resolve(new BigNumber(1)),
    getAllowance: () => Promise.resolve(ZERO),
  };

  const defaultBinanceSDK = {
    getABNBBBalance: () => Promise.resolve(new BigNumber(0.42)),
    getABNBCBalance: () => Promise.resolve(new BigNumber(24.6)),
    getABNBCRatio: () => Promise.resolve(new BigNumber(0.65)),
    getAllowance: () => Promise.resolve(ZERO),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);
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

    {
      const data = await sdk.getCommonData({
        chainId: BlockchainNetworkId.mainnet,
      });

      expect(data).toStrictEqual(expected);
    }

    {
      const data = await sdk.getCommonData({
        chainId: BlockchainNetworkId.goerli,
      });

      expect(data).toStrictEqual(expected);
    }
  });

  test('should return common data for binance network', async () => {
    const sdk = await SwitcherSDK.getInstance();
    const expected = {
      abBalance: new BigNumber(0.42),
      acBalance: new BigNumber(24.6),
      ratio: new BigNumber(0.65),
      allowance: ZERO,
    };

    {
      const data = await sdk.getCommonData({
        chainId: BlockchainNetworkId.smartchain,
      });

      expect(data).toStrictEqual(expected);
    }

    {
      const data = await sdk.getCommonData({
        chainId: BlockchainNetworkId.smartchainTestnet,
      });

      expect(data).toStrictEqual(expected);
    }
  });

  test('should not return common data for unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const data = await sdk.getCommonData({
      chainId: 9000 as AvailableSwitchNetwork,
    });

    expect(data).toBeUndefined();
  });
});
