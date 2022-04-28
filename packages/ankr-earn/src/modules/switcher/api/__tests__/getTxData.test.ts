import BigNumber from 'bignumber.js';

import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { ZERO_ADDR } from 'modules/common/const';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { AvailableSwitchNetwork } from 'modules/switcher/const';

import { SwitcherSDK } from '../SwitcherSDK';

jest.mock('modules/api/EthSDK', () => ({
  EthSDK: { getInstance: jest.fn() },
}));

jest.mock('modules/stake-bnb/api/BinanceSDK', () => ({
  BinanceSDK: { getInstance: jest.fn() },
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

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);
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
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(chainId =>
        sdk.fetchTxData({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
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
      [
        BlockchainNetworkId.smartchainTestnet,
        BlockchainNetworkId.smartchain,
      ].map(chainId =>
        sdk.fetchTxData({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
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
    });

    expect(result).toBeUndefined();
  });
});
