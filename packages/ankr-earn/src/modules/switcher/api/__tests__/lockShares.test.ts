import BigNumber from 'bignumber.js';

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

describe('modules/switcher/api/SwitcherSDK#lockShares', () => {
  const SUPPORTED_NETWORKS: AvailableSwitchNetwork[] = [
    BlockchainNetworkId.goerli,
    BlockchainNetworkId.mainnet,
    BlockchainNetworkId.smartchain,
    BlockchainNetworkId.smartchainTestnet,
  ];

  const defaultEthSDK = {
    lockShares: () => Promise.resolve({}),
  };

  const defaultBinanceSDK = {
    lockShares: () => Promise.resolve({}),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should lock shares on supported network properly', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      SUPPORTED_NETWORKS.map(async chainId =>
        sdk.lockShares({
          chainId,
          amount: new BigNumber(1),
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
    });

    expect(result).toBeUndefined();
  });
});
