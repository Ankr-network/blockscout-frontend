import { numberToHex } from 'web3-utils';
import { EEthereumNetworkId } from './types';

interface IRPCConfig {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored
}

export const OKX_WALLET_NAME = 'OKX Wallet';

export const RPCConfig: Record<number, IRPCConfig> = {
  // Mainnet config is partial, because there is no need to specify it fully
  [EEthereumNetworkId.mainnet]: {
    chainId: numberToHex(EEthereumNetworkId.mainnet),
    chainName: 'Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/eth'],
    blockExplorerUrls: ['https://etherscan.io'],
  },

  [EEthereumNetworkId.goerli]: {
    chainId: numberToHex(EEthereumNetworkId.goerli),
    chainName: 'Goerli Test Network',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    blockExplorerUrls: [
      'https://goerli.etherscan.io/',
      'https://blockscout.com/eth/goerli ',
    ],
  },

  [EEthereumNetworkId.smartchain]: {
    chainId: numberToHex(EEthereumNetworkId.smartchain),
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/bsc/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },

  [EEthereumNetworkId.smartchainTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.smartchainTestnet),
    chainName: 'Binance Smart Chain - Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/bsc_testnet_chapel'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },

  [EEthereumNetworkId.avalanche]: {
    chainId: numberToHex(EEthereumNetworkId.avalanche),
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/avalanche'],
    blockExplorerUrls: ['https://snowtrace.io/'],
  },

  [EEthereumNetworkId.avalancheTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.avalancheTestnet),
    chainName: 'Avalanche FUJI C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/avalanche_fuji'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  },

  [EEthereumNetworkId.fantom]: {
    chainId: numberToHex(EEthereumNetworkId.fantom),
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/fantom'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  [EEthereumNetworkId.fantomTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.fantomTestnet),
    chainName: 'Fantom testnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/fantom_testnet'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
  },
  [EEthereumNetworkId.polygon]: {
    chainId: numberToHex(EEthereumNetworkId.polygon),
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/polygon'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [EEthereumNetworkId.mumbai]: {
    chainId: numberToHex(EEthereumNetworkId.mumbai),
    chainName: 'Polygon testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/polygon_mumbai'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  [EEthereumNetworkId.gnosis]: {
    chainId: numberToHex(EEthereumNetworkId.gnosis),
    chainName: 'Gnosis',
    nativeCurrency: {
      name: 'xDai',
      symbol: 'xDai',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/gnosis'],
    blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
  },
  [EEthereumNetworkId.sokol]: {
    chainId: numberToHex(EEthereumNetworkId.sokol),
    chainName: 'Sokol',
    nativeCurrency: {
      name: 'SPOA',
      symbol: 'SPOA',
      decimals: 18,
    },
    rpcUrls: ['https://sokol.poa.network/'],
    blockExplorerUrls: ['https://blockscout.com/poa/sokol/'],
  },
};
