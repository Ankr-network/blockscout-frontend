import { ChainId } from 'domains/chains/api/chain';
import { Chain } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderTypes';
import { IChainParams } from 'modules/auth/actions/addNetwork';

const toHex = (num: number): string => {
  return `0x${num.toString(16)}`;
};

// harmony
export const HARMONY_MAINNET_PARAMS = {
  chainId: 1666600000,
  chainName: 'Harmony by Ankr Protocol',
  nativeCurrency: {
    name: 'Harmony',
    symbol: 'ONE',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.harmony.one/'],
};
// avalanche
export const AVALANCHE_MAINNET_PARAMS = {
  chainId: 43114,
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
  chainId: 250,
  chainName: 'Fantom by Ankr Protocol',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
  },
  blockExplorerUrls: ['https://ftmscan.com/'],
};

// polygon
const POLYGON_NETWORK_PARAMS = {
  chainId: 137,
  chainName: 'Polygon by Ankr Protocol',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://polygonscan.com/'],
};

const POLYGON_ZK_EVM_NETWORK_PARAMS = {
  chainId: 1101,
  chainName: 'Polygon zkEVM',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://zkevm.polygonscan.com/'],
};

// celo
const CELO_NETWORK_PARAMS = {
  chainId: 42220,
  chainName: 'Celo by Ankr Protocol',
  nativeCurrency: {
    name: 'Celo (Mainnet)',
    symbol: 'CELO',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.celo.org'],
};

// Arbitrum
const ARBITRUM_NETWORK_PARAMS = {
  chainId: 42161,
  chainName: 'Arbitrum by Ankr Protocol',
  nativeCurrency: {
    name: 'Arbitrum One',
    symbol: 'AETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://arbiscan.io'],
};

// iotex
const IOTEX_NETWORK_PARAMS = {
  chainId: 4689,
  chainName: 'IoTeX by Ankr Protocol',
  nativeCurrency: {
    name: 'IoTeX Mainnet',
    symbol: 'IOTX',
    decimals: 18,
  },
  blockExplorerUrls: ['https://iotexscan.io/'],
};

// nervos https://docs.godwoken.io/#godwoken-public-networks
const GODWOKEN_POLYJUICE_NETWORK_PARAMS = {
  chainId: 71394,
  chainName: 'Godwoken Polyjuice Mainnet by Ankr Protocol',
  nativeCurrency: {
    name: 'Godwoken Mainnet',
    symbol: 'CKB',
    decimals: 18,
  },
  blockExplorerUrls: ['https://www.layerview.io/'],
};

const KLAYTN_NETWORK_PARAMS = {
  chainId: 8217,
  chainName: 'Klaytn Mainnet Cypress',
  nativeCurrency: {
    name: 'KLAY',
    symbol: 'KLAY',
    decimals: 18,
  },
  blockExplorerUrls: ['https://scope.klaytn.com/'],
};

const BSC_NETWORK_PARAMS = {
  chainId: 56,
  chainName: 'BSC by Ankr Protocol',
  nativeCurrency: {
    name: 'Smart Chain',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: ['https://bscscan.com'],
};

const GNOSIS_NETWORK_PARAMS = {
  chainId: 100,
  chainName: 'Gnosis Chain by Ankr Protocol',
  nativeCurrency: {
    name: 'xDAI Chain',
    symbol: 'xDAI',
    decimals: 18,
  },
  blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
};

const CHILIZ_NETWORK_PARAMS = {
  chainId: 88888,
  chainName: 'Chiliz Chain Mainnet',
  nativeCurrency: {
    name: 'Chiliz (Mainnet)',
    symbol: 'CHZ',
    decimals: 18,
  },
  blockExplorerUrls: ['https://scan.chiliz.com/'],
};

// https://docs.tenet.org/mainnet-beta/tenet-mainnet
const TENET_NETWORK_PARAMS = {
  chainId: 1559,
  chainName: 'Tenet Mainnet',
  nativeCurrency: {
    name: 'Tenet Mainnet',
    symbol: 'TENET',
    decimals: 18,
  },
  blockExplorerUrls: ['https://tenetscan.io/'],
};

const ZKSYNC_ERA_PRARMS = {
  chainId: 324,
  chainName: 'zkSync Era Mainnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.zksync.io/'],
};

const mapParams = (
  chain: Chain,
  networkData: typeof AVALANCHE_MAINNET_PARAMS,
  rpcUrls?: string[],
): IChainParams => {
  return {
    ...networkData,
    chainId: toHex(networkData.chainId),
    rpcUrls: rpcUrls || chain.rpcLinks,
  };
};

/* map network data for using addNetwork action */
export const getMappedNetwork = (chain: Chain): IChainParams | undefined => {
  switch (chain.id) {
    case 'harmony':
      return mapParams(chain, HARMONY_MAINNET_PARAMS);
    case 'avalanche':
      return mapParams(chain, AVALANCHE_MAINNET_PARAMS);
    /* adding ethereum network got error: MetaMask - RPC Error: May not specify default MetaMask chain. */
    case 'eth':
      return undefined;
    case 'fantom':
      return mapParams(chain, FANTOM_NETWORK_PARAMS);
    case 'polygon':
      return mapParams(chain, POLYGON_NETWORK_PARAMS);
    case 'zkevm':
      return mapParams(chain, POLYGON_ZK_EVM_NETWORK_PARAMS);
    case 'solana':
      return undefined;
    case 'xdai':
      return undefined;
    case 'celo':
      return mapParams(chain, CELO_NETWORK_PARAMS);
    case 'arbitrum':
      return mapParams(chain, ARBITRUM_NETWORK_PARAMS);
    case 'near':
      return undefined;
    case 'iotex':
      return mapParams(chain, IOTEX_NETWORK_PARAMS);
    case 'nervos':
      return mapParams(chain, GODWOKEN_POLYJUICE_NETWORK_PARAMS);
    case 'gnosis':
      return mapParams(chain, GNOSIS_NETWORK_PARAMS);
    case 'klaytn':
      return mapParams(chain, KLAYTN_NETWORK_PARAMS);
    case 'bsc':
      return mapParams(chain, BSC_NETWORK_PARAMS);
    case 'chiliz':
      return mapParams(chain, CHILIZ_NETWORK_PARAMS);
    case 'tenet_evm':
      return mapParams(chain, TENET_NETWORK_PARAMS);
    case ChainId.ZksyncEra:
      return mapParams(chain, ZKSYNC_ERA_PRARMS);
    default:
      return undefined;
  }
};
