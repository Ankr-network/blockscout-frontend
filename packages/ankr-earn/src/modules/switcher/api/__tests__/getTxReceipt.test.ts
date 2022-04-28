import { BlockchainNetworkId } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { AvailableSwitchNetwork } from 'modules/switcher/const';

import { SwitcherSDK } from '../SwitcherSDK';

jest.mock('modules/api/EthSDK', () => ({
  EthSDK: { getInstance: jest.fn() },
}));

jest.mock('modules/stake-bnb/api/BinanceSDK', () => ({
  BinanceSDK: { getInstance: jest.fn() },
}));

describe('modules/switcher/api/SwitcherSDK#getTxReceipt', () => {
  const defaultEthSDK = {
    fetchTxReceipt: () => Promise.resolve({}),
  };

  const defaultBinanceSDK = {
    fetchTxReceipt: () => Promise.resolve({}),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return tx receipt for ethereum network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      [BlockchainNetworkId.goerli, BlockchainNetworkId.mainnet].map(chainId =>
        sdk.fetchTxReceipt({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
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
      [
        BlockchainNetworkId.smartchainTestnet,
        BlockchainNetworkId.smartchain,
      ].map(chainId =>
        sdk.fetchTxReceipt({
          chainId: chainId as AvailableSwitchNetwork,
          txHash: 'hash',
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
    });

    expect(result).toBeUndefined();
  });
});
