import { EEthereumNetworkId } from 'provider';

import { Token } from 'modules/common/types/token';

export const nativeTokenMap: Partial<Record<EEthereumNetworkId, Token>> = {
  [EEthereumNetworkId.avalanche]: Token.AVAX,
  [EEthereumNetworkId.avalancheTestnet]: Token.AVAX,
  [EEthereumNetworkId.smartchain]: Token.BNB,
  [EEthereumNetworkId.smartchainTestnet]: Token.BNB,
  [EEthereumNetworkId.mainnet]: Token.ETH,
  [EEthereumNetworkId.ropsten]: Token.ETH,
  [EEthereumNetworkId.rinkeby]: Token.ETH,
  [EEthereumNetworkId.goerli]: Token.ETH,
  [EEthereumNetworkId.dev]: Token.ETH,
  [EEthereumNetworkId.fantom]: Token.FTM,
  [EEthereumNetworkId.fantomTestnet]: Token.FTM,
  [EEthereumNetworkId.polygon]: Token.MATIC,
  [EEthereumNetworkId.mumbai]: Token.MATIC,
};
