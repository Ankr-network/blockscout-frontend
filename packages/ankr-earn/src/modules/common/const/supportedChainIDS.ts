import { EEthereumNetworkId } from '@ankr.com/provider-core';

export enum SupportedChainIDS {
  MAINNET = EEthereumNetworkId.mainnet,
  GOERLI = EEthereumNetworkId.goerli,
  AVAX = EEthereumNetworkId.avalanche,
  AVAX_TESTNET = EEthereumNetworkId.avalancheTestnet,
  BSC = EEthereumNetworkId.smartchain,
  BSC_TESTNET = EEthereumNetworkId.smartchainTestnet,
  FANTOM_OPERA = EEthereumNetworkId.fantom,
  FANTOM_TESTNET = EEthereumNetworkId.fantomTestnet,
  POLYGON = EEthereumNetworkId.polygon,
  POLYGON_MUMBAI_TESTNET = EEthereumNetworkId.mumbai,
  GNOSIS = EEthereumNetworkId.gnosis,
  GNOSIS_SOKOL = EEthereumNetworkId.sokol,
}
