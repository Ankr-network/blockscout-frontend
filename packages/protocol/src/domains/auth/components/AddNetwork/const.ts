import {
  BSC_CHAIN_NAME,
  TRON_CHAIN_NAME,
} from 'domains/auth/utils/mappingchainName';
import { ChainID } from 'modules/chains/types';

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
  chainId: 5000,
  chainName: 'Mantle Mainnet',
  nativeCurrency: {
    name: 'MNT',
    symbol: 'MNT',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.mantle.xyz'],
};

const MANTLE_TESTNET: NetworkInfo = {
  chainId: 5001,
  chainName: 'Mantle Goerli Testnet',
  nativeCurrency: {
    name: 'MNT',
    symbol: 'MNT',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.testnet.mantle.xyz/'],
};

const MANTLE_SEPOLIA: NetworkInfo = {
  chainId: 5003,
  chainName: 'Mantle Sepolia Testnet',
  nativeCurrency: {
    name: 'MNT',
    symbol: 'MNT',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.sepolia.mantle.xyz/'],
};

const ROLLUX: NetworkInfo = {
  chainId: 570,
  chainName: 'Rollux Mainnet',
  nativeCurrency: {
    name: 'SYS',
    symbol: 'SYS',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.rollux.com'],
};

const ROLLUX_TESTNET: NetworkInfo = {
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
  chainName: 'ZetaChain Athens Testnet',
  nativeCurrency: {
    name: 'ZETA',
    symbol: 'ZETA',
    decimals: 18,
  },
  blockExplorerUrls: ['https://explorer.zetachain.com/'],
};

const TRON_CHAIN_JSON_RPC: NetworkInfo = {
  chainId: 728126428,
  chainName: `${TRON_CHAIN_NAME} JSON-RPC`,
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://tronscan.org/'],
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

  [ChainID.ARBITRUM_SEPOLIA]: {
    chainId: 421614,
    chainName: 'Arbitrum Sepolia Testnet',
    nativeCurrency: {
      name: 'Arbitrum One',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia-explorer.arbitrum.io'],
  },

  [ChainID.ARBITRUM_TESTNET]: {
    chainId: 421613,
    chainName: 'Arbitrum Goerli Testnet',
    nativeCurrency: {
      name: 'Arbitrum One',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://goerli.arbiscan.io'],
  },
  [ChainID.ARBITRUM_NOVA]: ARBITRUM_NOVA,

  [ChainID.BSC]: {
    chainId: 56,
    chainName: BSC_CHAIN_NAME,
    nativeCurrency: {
      name: 'Smart Chain',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com'],
    searchKeys: ['bsc', 'binance'],
  },

  [ChainID.BSC_TESTNET_CHAPEL]: {
    chainId: 97, // * the only BSC testnet
    chainName: `${BSC_CHAIN_NAME} Testnet`,
    nativeCurrency: {
      name: 'Smart Chain - Testnet',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },

  [ChainID.BITLAYER_TESTNET]: {
    chainId: 200810,
    chainName: 'Bitlayer Chain Testnet',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet-scan.bitlayer.org'],
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

  [ChainID.BLAST]: {
    chainId: 81457,
    chainName: 'Blast Mainnet',
    nativeCurrency: {
      name: 'BLAST',
      symbol: 'BLAST',
      decimals: 18,
    },
    blockExplorerUrls: ['https://blastscan.io'],
  },

  [ChainID.BLAST_TESTNET_SEPOLIA]: {
    chainId: 168587773,
    chainName: 'Blast s2 Testnet',
    nativeCurrency: {
      name: 'BLAST',
      symbol: 'BLAST',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.blastscan.io'],
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

  // https://chainlist.org/chain/1116?testnets=true
  [ChainID.CORE]: {
    chainId: 1116,
    chainName: 'Core Blockchain Mainnet',
    nativeCurrency: {
      name: 'Core Blockchain Mainnet',
      symbol: 'CORE',
      decimals: 18,
    },
    blockExplorerUrls: ['https://rpc-core.icecreamswap.com'],
  },

  // * ChainID.ETH, ChainID.ETH_RINKEBY, ChainID.ETH_ROPSTEN
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

  [ChainID.ETH_HOLESKY]: {
    chainId: 17000,
    chainName: 'Ethereum Holesky',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ethereum-holesky.publicnode.com/'],
  },

  [ChainID.ELECTRONEUM]: {
    chainId: 52014,
    chainName: 'Electroneum Mainnet',
    nativeCurrency: {
      name: 'ETN',
      symbol: 'ETN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://blockexplorer.electroneum.com/'],
  },

  [ChainID.ELECTRONEUM_TESTNET]: {
    chainId: 5201420,
    chainName: 'Electroneum Testnet',
    nativeCurrency: {
      name: 'ETN',
      symbol: 'ETN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://blockexplorer.thesecurityteam.rocks/'],
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

  [ChainID.FLARE]: {
    chainId: 14,
    chainName: 'Flare',
    nativeCurrency: {
      name: 'Flare',
      symbol: 'FLR',
      decimals: 18,
    },
    blockExplorerUrls: ['https://flare-explorer.flare.network'],
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

  [ChainID.HORIZEN]: {
    chainId: 7332,
    chainName: 'Horizen EON Mainnet',
    nativeCurrency: {
      name: 'Horizen',
      symbol: 'ZEN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://eon-explorer.horizenlabs.io'],
  },

  /* https://chainlist.org/?chain=1663&testnets=true&search=horizen */
  [ChainID.HORIZEN_TESTNET]: {
    chainId: 1663,
    chainName: 'Horizen Gobi Testnet',
    nativeCurrency: {
      name: 'Horizen',
      symbol: 'tZEN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://gobi-testnet.horizenlabs.io/ethv1'],
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

  [ChainID.XLAYER]: {
    chainId: 196,
    chainName: 'X Layer',
    nativeCurrency: {
      name: 'OKB',
      symbol: 'OKB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://www.okx.com/explorer/xlayer'],
  },

  [ChainID.XLAYER_TESTNET]: {
    chainId: 195,
    chainName: 'X Layer Testnet',
    nativeCurrency: {
      name: 'OKB',
      symbol: 'OKB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://www.okx.com/explorer/xlayer-test'],
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
    blockExplorerUrls: ['https://goerli-explorer.optimism.io/'],
  },
  [ChainID.OPTIMISM_SEPOLIA]: {
    chainId: 11155420,
    chainName: 'OP Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://optimism-sepolia.blockscout.com/'],
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

  [ChainID.POLYGON_AMOY]: {
    chainId: 80002,
    chainName: 'Amoy Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://www.oklink.com/amoy'],
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

  [ChainID.POLYGON_ZKEVM_CARDONA]: {
    chainId: 2442,
    chainName: 'Polygon zkEVM Cardona testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://cardona-zkevm.polygonscan.com/'],
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

  [ChainID.KINTO]: {
    chainId: 7887,
    chainName: 'Kinto Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.kinto.xyz/'],
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

  [ChainID.TENET]: {
    chainId: 1559,
    chainName: 'Tenet Mainnet',
    nativeCurrency: {
      name: 'Tenet Mainnet',
      symbol: 'TENET',
      decimals: 18,
    },
    blockExplorerUrls: ['https://tenetscan.io/'],
  },

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

  [ChainID.ZKSYNC_ERA_TESTNET]: {
    chainId: 280,
    chainName: 'zkSync Era Goerli Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.explorer.zksync.io/'],
  },

  [ChainID.ZKSYNC_ERA_SEPOLIA]: {
    chainId: 300,
    chainName: 'zkSync Era Sepolia Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://goerli.explorer.zksync.io/'],
  },

  [ChainID.LINEA]: {
    chainId: 59144,
    chainName: 'Linea Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://lineascan.build'],
  },

  [ChainID.MANTLE]: MANTLE,
  [ChainID.MANTLE_TESTNET]: MANTLE_TESTNET,
  [ChainID.MANTLE_SEPOLIA]: MANTLE_SEPOLIA,

  [ChainID.ROLLUX]: ROLLUX,

  [ChainID.ROLLUX_TESTNET]: ROLLUX_TESTNET,

  [ChainID.ZETACHAIN]: ZETACHAIN,

  [ChainID.ZETACHAIN_EVM_ATHENS_TESTNET]: ZETACHAIN,

  [ChainID.TRON]: TRON_CHAIN_JSON_RPC,

  [ChainID.TRON_JSON_RPC]: TRON_CHAIN_JSON_RPC,

  [ChainID.BASE]: {
    chainId: 8453,
    chainName: 'Base Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://basescan.org'],
  },
  [ChainID.BASE_TESTNET]: {
    chainId: 84531,
    chainName: 'Base Goerli',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://goerli.basescan.org/'],
  },
  [ChainID.BASE_SEPOLIA]: {
    chainId: 84532,
    chainName: 'Base Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia-explorer.base.org/'],
  },

  [ChainID.TAIKO_HEKLA]: {
    chainId: 167009,
    chainName: 'Taiko Hekla testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.hekla.taiko.xyz/'],
  },

  [ChainID.TELOS]: {
    chainId: 40,
    chainName: 'Telos',
    nativeCurrency: {
      name: 'TLOS',
      symbol: 'TLOS',
      decimals: 18,
    },
    blockExplorerUrls: ['https://teloscan.io'],
  },

  [ChainID.SCROLL]: {
    chainId: 534352,
    chainName: 'Scroll Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://blockscout.scroll.io'],
  },

  [ChainID.SCROLL_TESTNET]: {
    chainId: 534353,
    chainName: 'Scroll Alpha Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://alpha-blockscout.scroll.io'],
  },

  [ChainID.SCROLL_SEPOLIA_TESTNET]: {
    chainId: 534351,
    chainName: 'Scroll Sepolia Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia-blockscout.scroll.io/'],
  },

  [ChainID.XDC]: {
    chainId: 50,
    chainName: 'XDC Network',
    nativeCurrency: {
      name: 'XDC',
      symbol: 'XDC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://xdcscan.io'],
  },

  [ChainID.XDC_TESTNET]: {
    chainId: 51,
    chainName: 'XDC Testnet',
    nativeCurrency: {
      name: 'TXDC',
      symbol: 'TXDC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.apothem.network/'],
  },

  [ChainID.KAVA_EVM]: {
    chainId: 2222,
    chainName: 'Kava',
    nativeCurrency: {
      name: 'KAVA',
      symbol: 'KAVA',
      decimals: 18,
    },
    blockExplorerUrls: ['https://kavascan.com/'],
  },

  [ChainID.KAVA_EVM_TESTNET]: {
    chainId: 2221,
    chainName: 'Kava Testnet',
    nativeCurrency: {
      name: 'KAVA',
      symbol: 'KAVA',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.kavascan.com/'],
  },

  [ChainID.XAI]: {
    chainId: 660279,
    chainName: 'XAI',
    nativeCurrency: {
      name: 'XAI',
      symbol: 'XAI',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.xai-chain.net/'],
  },
  [ChainID.XAI_TESTNET]: {
    chainId: 47279324479,
    chainName: 'XAI Testnet',
    nativeCurrency: {
      name: 'GETH',
      symbol: 'GETH',
      decimals: 18,
    },
    blockExplorerUrls: [' https://testnet-explorer.xai-chain.net/'],
  },

  [ChainID.BAHAMUT]: {
    chainId: 5165,
    chainName: 'Bahamut',
    nativeCurrency: {
      name: 'FTN',
      symbol: 'FTN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://www.ftnscan.com/'],
  },

  [ChainID.BAHAMUT_OCEAN]: {
    chainId: 4058,
    chainName: 'Bahamut Ocean Testnet',
    nativeCurrency: {
      name: 'FTN',
      symbol: 'FTN',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ocean.ftnscan.com/'],
  },

  [ChainID.GRAVITY]: {
    chainId: 1625,
    chainName: 'Gravity Mainnet',
    nativeCurrency: {
      name: 'G.',
      symbol: 'G.',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.gravity.xyz/'],
  },
};
