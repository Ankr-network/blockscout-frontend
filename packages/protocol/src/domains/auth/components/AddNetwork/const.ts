import { ChainID } from 'modules/chains/types';
import { NetworkInfo } from './types';

// * ChainID: must be decimal (convert hex to decimal if needed)

const AVALANCHE: NetworkInfo = {
  chainId: 43114,
  chainName: 'Avalanche',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  blockExplorerUrls: ['https://snowtrace.io/'],
};

const AVALANCHE_FUJI: NetworkInfo = {
  chainId: 43113,
  chainName: 'Avalanche Fuji',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
};

export const NETWORK_INFO_MAP: Partial<Record<ChainID, NetworkInfo>> = {
  // ? https://support.avax.network/en/articles/6077308-what-are-the-differences-between-the-x-p-and-c-chains
  [ChainID.AVALANCHE]: AVALANCHE,

  [ChainID.AVALANCHE_EVM]: AVALANCHE,

  [ChainID.AVALANCHE_FUJI]: AVALANCHE_FUJI,

  [ChainID.AVALANCHE_FUJI_EVM]: AVALANCHE_FUJI,

  [ChainID.BSC]: {
    chainId: 56,
    chainName: 'BSC',
    nativeCurrency: {
      name: 'Smart Chain',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com'],
  },

  [ChainID.BSC_TESTNET_CHAPEL]: {
    chainId: 97, // * the only BSC testnet
    chainName: 'BSC testnet',
    nativeCurrency: {
      name: 'Smart Chain - Testnet',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },

  [ChainID.BTTC]: {
    chainId: 199,
    chainName: 'BitTorrent Chain Mainnet',
    nativeCurrency: {
      name: 'BTTC Mainnet',
      symbol: 'BTT',
      decimals: 18,
    },
    blockExplorerUrls: ['https://scan.bt.io/'],
  },

  [ChainID.CELO]: {
    chainId: 42220,
    chainName: 'Celo (Mainnet)',
    nativeCurrency: {
      name: 'Celo (Mainnet)',
      symbol: 'CELO',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.celo.org'],
  },

  // * ChainID.ETH, ChainID.ETH_GOERLI, ChainID.ETH_RINKEBY, ChainID.ETH_ROPSTEN
  // * Can't be added as they are default Metamask chains

  [ChainID.ETH_SEPOLIA]: {
    // ? ETH
    chainId: 11155111,
    chainName: 'Ethereum Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  },

  [ChainID.FANTOM]: {
    chainId: 250,
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ftmscan.com/'],
  },

  [ChainID.FANTOM_TESTNET]: {
    chainId: 4002, // * 0xfa2
    chainName: 'Fantom testnet',
    nativeCurrency: {
      name: 'Fantom testnet',
      symbol: 'FTM',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
  },

  [ChainID.GNOSIS]: {
    chainId: 100, // * 0x64
    chainName: 'Gnosis Chain',
    nativeCurrency: {
      name: 'Gnosis',
      symbol: 'xDai',
      decimals: 18,
    },
    blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
  },

  [ChainID.GNOSIS_TESTNET]: {
    chainId: 10200,
    chainName: 'Chiado Chain',
    nativeCurrency: {
      name: 'Chiado',
      symbol: 'Chiado',
      decimals: 18,
    },
    blockExplorerUrls: ['https://blockscout.chiadochain.net/'],
  },

  [ChainID.HARMONY]: {
    chainId: 1666600000,
    chainName: 'Harmony Mainnet',
    nativeCurrency: {
      name: 'Harmony',
      symbol: 'ONE',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.harmony.one/'],
  },

  [ChainID.IOTEX]: {
    chainId: 4689,
    chainName: 'IoTeX Mainnet',
    nativeCurrency: {
      name: 'IoTeX Mainnet',
      symbol: 'IOTX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://iotexscan.io/'],
  },

  [ChainID.METIS]: {
    chainId: 1088,
    chainName: 'Metis Andromeda Mainnet',
    nativeCurrency: {
      name: 'Metis Andromeda',
      symbol: 'METIS',
      decimals: 18,
    },
    blockExplorerUrls: ['https://andromeda-explorer.metis.io/'],
  },

  [ChainID.MOONBEAM]: {
    chainId: 1284,
    chainName: 'Moonbeam',
    nativeCurrency: {
      name: 'Glimmer',
      symbol: 'GLMR',
      decimals: 18,
    },
    blockExplorerUrls: ['https://moonbeam.moonscan.io/'],
  },

  [ChainID.NERVOS]: {
    chainId: 71402, // * v1's id
    chainName: 'Godwoken/PolyJuice Mainnet',
    nativeCurrency: {
      name: 'CKByte',
      symbol: 'CKB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://v0.gwscan.com/'],
  },

  [ChainID.OPTIMISM]: {
    chainId: 10,
    chainName: 'Optimism',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
  },

  [ChainID.OPTIMISM_TESTNET]: {
    chainId: 420,
    chainName: 'Optimism Goerli Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://blockscout.com/optimism/goerli/'],
  },

  [ChainID.POLYGON]: {
    chainId: 137,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com/'],
  },

  [ChainID.POLYGON_MUMBAI]: {
    chainId: 80001,
    chainName: 'Mumbai testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },

  [ChainID.SYSCOIN]: {
    chainId: 57,
    chainName: 'Syscoin Mainnet',
    nativeCurrency: {
      name: 'Syscoin',
      symbol: 'SYS',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.syscoin.org/'],
  },

  [ChainID.KLAYTN]: {
    chainId: 8217,
    chainName: 'Klaytn Mainnet Cypress',
    nativeCurrency: {
      name: 'KLAY',
      symbol: 'KLAY',
      decimals: 18,
    },
    blockExplorerUrls: ['https://scope.klaytn.com/'],
  },

  [ChainID.KLAYTN_TESTNET]: {
    chainId: 1001,
    chainName: 'Klaytn Testnet Baobab',
    nativeCurrency: {
      name: 'KLAY',
      symbol: 'KLAY',
      decimals: 18,
    },
    blockExplorerUrls: ['https://baobab.scope.klaytn.com/'],
  },
};
