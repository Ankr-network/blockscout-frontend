import { Chain } from '../../../../domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { IChainParams } from '../../actions/addNetwork';

// avalanche
export const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche by Ankr Protocol',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
};
// fantom
const FANTOM_NETWORK_PARAMS = {
  chainId: '0xFA',
  chainName: 'Fantom by Ankr Protocol',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
  },
  blockExplorerUrls: ['https://ftmscan.com/'],
};
// eth
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ETHEREUM_MAINNET_PARAMS = {
  chainId: '0x1',
  chainName: 'Ethereum by Ankr Protocol',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://etherscan.io'],
};
// polygon
const POLYGON_NETWORK_PARAMS = {
  chainId: '0x89',
  chainName: 'Polygon by Ankr Protocol',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://polygonscan.com/'],
};
// solana
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SOLANA_NETWORK_PARAMS = {
  chainId: '0xE9AC0D6', // wrong network id
  chainName: 'Neon by Ankr Protocol',
  nativeCurrency: {
    name: 'Neon',
    symbol: 'NEON',
    decimals: 18,
  },
  blockExplorerUrls: ['https://neon-labs.org/'],
};
// xdai
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const XDAI_NETWORK_PARAMS = {
  chainId: '0x64',
  chainName: 'xDAI by Ankr Protocol',
  nativeCurrency: {
    name: 'xDAI',
    symbol: 'xDAI',
    decimals: 18,
  },
  blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
};
/* map network data for using addNetwork action */
export const getMappedNetwork = (chain: Chain): IChainParams | undefined => {
  switch (chain.id) {
    case 'avalanche':
      return { ...AVALANCHE_MAINNET_PARAMS, rpcUrls: chain.rpcLinks };
    /* adding ethereum network got error: MetaMask - RPC Error: May not specify default MetaMask chain. */
    case 'eth':
      return undefined;
    case 'fantom':
      return { ...FANTOM_NETWORK_PARAMS, rpcUrls: chain.rpcLinks };
    case 'polygon':
      return { ...POLYGON_NETWORK_PARAMS, rpcUrls: chain.rpcLinks };
    /* adding solana network returns error: Request for method 'eth_chainId on https://proxy.mainnet.neonlabs.org/solana failed */
    case 'solana':
      return undefined;
    case 'xdai':
      return undefined;
    default:
      return undefined;
  }
};
