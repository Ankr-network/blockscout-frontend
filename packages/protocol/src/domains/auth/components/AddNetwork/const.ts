import { ChainID } from 'domains/chains/types';
import { NetworkInfo } from './types';

// * ChainID: must be decimal (convert hex to decimal if needed)

export const TRON_RESET_API_GROUP_ID = 'rest-api';

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

const MANTLE: NetworkInfo = {
  chainId: 5001,
  chainName: 'Mantle Testnet',
  nativeCurrency: {
    name: 'BIT',
    symbol: 'BIT',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.testnet.mantle.xyz/'],
};

const ROLLUX: NetworkInfo = {
  chainId: 57000,
  chainName: 'Rollux Testnet',
  nativeCurrency: {
    name: 'TSYS',
    symbol: 'TSYS',
    decimals: 18,
  },
  blockExplorerUrls: ['https://rollux.tanenbaum.io/'],
};

const ZETACHAIN: NetworkInfo = {
  chainId: 7001,
  chainName: 'ZetaChain Testnet',
  nativeCurrency: {
    name: 'ZETA',
    symbol: 'ZETA',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.zetachain.com/'],
};

const TRON_CHAIN_JSON_RPC: NetworkInfo = {
  chainId: 728126428,
  chainName: 'Tron JSON-RPC',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://tronscan.org/'],
};

const BASECHAIN: NetworkInfo = {
  chainId: 84531,
  chainName: 'Base Goerli',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://goerli.basescan.org/'],
};

const SCROLLCHAIN: NetworkInfo = {
  chainId: 534353,
  chainName: 'Scroll Testnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://blockscout.scroll.io/'],
};

const ARBITRUM_NOVA: NetworkInfo = {
  chainId: 42170,
  chainName: 'Arbitrum Nova',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://nova-explorer.arbitrum.io'],
};

// https://docs.tenet.org/mainnet-beta/tenet-mainnet
const TENET: NetworkInfo = {
  chainId: 1559,
  chainName: 'Tenet Mainnet',
  nativeCurrency: {
    name: 'Tenet Mainnet',
    symbol: 'TENET',
    decimals: 18,
  },
  blockExplorerUrls: ['https://tenetscan.io/'],
};

export const NETWORK_INFO_MAP: Partial<Record<ChainID, NetworkInfo>> = {
  // ? https://support.avax.network/en/articles/6077308-what-are-the-differences-between-the-x-p-and-c-chains
  [ChainID.AVALANCHE]: AVALANCHE,

  [ChainID.AVALANCHE_EVM]: AVALANCHE,

  [ChainID.AVALANCHE_FUJI]: AVALANCHE_FUJI,

  [ChainID.AVALANCHE_FUJI_EVM]: AVALANCHE_FUJI,

  [ChainID.ARBITRUM]: {
    chainId: 42161,
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Arbitrum One',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [
      'https://arbiscan.io/',
      'https://explorer.arbitrum.io/',
    ],
  },

  [ChainID.ARBITRUM_NOVA]: ARBITRUM_NOVA,

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
    chainName: 'BSC Testnet',
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

  /* https://docs.chiliz.com/chiliz-chain-mainnet/connect-to-chiliz-chain/connect-using-rpc */
  [ChainID.CHILIZ]: {
    chainId: 88888,
    chainName: 'Chiliz Chain Mainnet',
    nativeCurrency: {
      name: 'Chiliz (Mainnet)',
      symbol: 'CHZ',
      decimals: 18,
    },
    blockExplorerUrls: ['https://scan.chiliz.com/'],
  },

  /* https://docs.chiliz.com/chiliz-chain-testnets/spicy-testnet/install-and-develop/install-and-use-metamask */
  [ChainID.CHILIZ_TESTNET]: {
    chainId: 88882,
    chainName: 'Chiliz Spicy Testnet',
    nativeCurrency: {
      name: 'Chiliz Spicy Testnet',
      symbol: 'CHZ',
      decimals: 18,
    },
    blockExplorerUrls: ['http://spicy-explorer.chiliz.com/'],
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
    chainName: 'Fantom Testnet',
    nativeCurrency: {
      name: 'Fantom Testnet',
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

  /* https://chainlist.org/?chain=1663&testnets=true&search=horizen */
  [ChainID.HORIZEN_TESTNET]: {
    chainId: 1663, // 0x67f
    chainName: 'Horizen Gobi Testnet',
    nativeCurrency: {
      name: 'Horizen',
      symbol: 'tZEN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://yuma-testnet.horizenlabs.io/ethv1/'],
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

  [ChainID.IOTEX_TESTNET]: {
    chainId: 4690,
    chainName: 'IoTeX Testnet',
    nativeCurrency: {
      name: 'IoTeX Testnet',
      symbol: 'IOTX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.iotexscan.io/'],
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
    blockExplorerUrls: ['https://gwscan.com/'],
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
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },

  [ChainID.POLYGON_ZKEVM]: {
    chainId: 1101,
    chainName: 'Polygon zkEVM',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://zkevm.polygonscan.com/'],
  },

  [ChainID.POLYGON_ZKEVM_TESTNET]: {
    chainId: 1442,
    chainName: 'Polygon zkEVM testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet-zkevm.polygonscan.com/'],
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

  [ChainID.HECO]: {
    chainId: 128,
    chainName: 'Heco',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    blockExplorerUrls: ['https://hecoinfo.com/'],
  },

  [ChainID.HECO_TESTNET]: {
    chainId: 256,
    chainName: 'HECO Testnet',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.hecoinfo.com/'],
  },

  [ChainID.TENET]: TENET,
  [ChainID.TENET_EVM]: TENET,

  // https://era.zksync.io/docs/dev/fundamentals/interacting.html#connecting-to-zksync-era-on-metamask
  [ChainID.ZKSYNC_ERA]: {
    chainId: 324,
    chainName: 'zkSync Era Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.zksync.io/'],
  },

  [ChainID.MANTLE]: MANTLE,

  [ChainID.MANTLE_TESTNET]: MANTLE,

  [ChainID.ROLLUX]: ROLLUX,

  [ChainID.ROLLUX_TESTNET]: ROLLUX,

  [ChainID.ZETACHAIN]: ZETACHAIN,

  [ChainID.ZETACHAIN_EVM_TESTNET]: ZETACHAIN,

  [ChainID.TRON]: TRON_CHAIN_JSON_RPC,

  [ChainID.TRON_JSON_RPC]: TRON_CHAIN_JSON_RPC,

  [ChainID.BASE]: BASECHAIN,
  [ChainID.BASE_TESTNET]: BASECHAIN,

  [ChainID.SCROLL]: SCROLLCHAIN,
  [ChainID.SCROLL_TESTNET]: SCROLLCHAIN,
};
