import { numberToHex } from 'web3-utils';
import { BlockchainNetworkId } from './types';

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

export const RPCConfig: Record<number, IRPCConfig> = {
  // Mainnet config is partial, because there is no need to specify it fully
  [BlockchainNetworkId.mainnet]: {
    chainId: numberToHex(BlockchainNetworkId.mainnet),
    chainName: 'Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: [''],
  },

  [BlockchainNetworkId.goerli]: {
    chainId: numberToHex(BlockchainNetworkId.goerli),
    chainName: 'Goerli Test Network',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.goerli.mudit.blog/'],
    blockExplorerUrls: [
      'https://goerli.etherscan.io/',
      'https://blockscout.com/eth/goerli ',
    ],
  },

  [BlockchainNetworkId.smartchain]: {
    chainId: numberToHex(BlockchainNetworkId.smartchain),
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },

  [BlockchainNetworkId.smartchainTestnet]: {
    chainId: numberToHex(BlockchainNetworkId.smartchainTestnet),
    chainName: 'Binance Smart Chain - Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },

  [BlockchainNetworkId.avalanche]: {
    chainId: numberToHex(BlockchainNetworkId.avalanche),
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  },

  [BlockchainNetworkId.avalancheTestnet]: {
    chainId: numberToHex(BlockchainNetworkId.avalancheTestnet),
    chainName: 'Avalanche FUJI C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },

  [BlockchainNetworkId.fantom]: {
    chainId: numberToHex(BlockchainNetworkId.fantom),
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ftm.tools/'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  [BlockchainNetworkId.fantomTestnet]: {
    chainId: numberToHex(BlockchainNetworkId.fantomTestnet),
    chainName: 'Fantom testnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.testnet.fantom.network/'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
  },
};
