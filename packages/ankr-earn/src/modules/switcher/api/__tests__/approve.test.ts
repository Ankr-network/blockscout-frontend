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

describe('modules/switcher/api/SwitcherSDK#approve', () => {
  const SUPPORTED_NETWORKS: AvailableSwitchNetwork[] = [
    BlockchainNetworkId.goerli,
    BlockchainNetworkId.mainnet,
    BlockchainNetworkId.smartchain,
    BlockchainNetworkId.smartchainTestnet,
  ];

  const defaultEthSDK = {
    approveAETHCForAETHB: () => Promise.resolve({}),
  };

  const defaultBinanceSDK = {
    approveABNBCUnstake: () => Promise.resolve({}),
  };

  beforeEach(() => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(defaultEthSDK);

    (BinanceSDK.getInstance as jest.Mock).mockReturnValue(defaultBinanceSDK);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should approve certificate for bond on supported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const results = await Promise.all(
      SUPPORTED_NETWORKS.map(chainId => sdk.approve({ chainId })),
    );

    results.forEach(result => {
      expect(result).toBeDefined();
    });
  });

  test('should not approve certificate for bond on unsupported network', async () => {
    const sdk = await SwitcherSDK.getInstance();

    const result = await sdk.approve({
      chainId: 9000 as AvailableSwitchNetwork,
    });

    expect(result).toBeUndefined();
  });
});
