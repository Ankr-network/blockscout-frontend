import { currentEnv } from 'modules/common/const';
import { BlockchainNetworkId, Env } from 'modules/common/types';
import { numberToHex } from 'web3-utils';

export interface IContractConfig {
  ETHContract?: string;
  aethContract?: string;
  fethContract?: string;
  maticToken?: string;
  aMaticbToken?: string;
}

export interface IStkrConfig {
  contractConfig: IContractConfig;
}

export interface IRPCConfig {
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

const LOCAL_CONFIG: IStkrConfig = {
  contractConfig: {
    ETHContract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aethContract: '0x63dC5749fa134fF3B752813388a7215460a8aB01',
    fethContract: '0xe64FCf6327bB016955EFd36e75a852085270c374',
    maticToken: '0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae',
    aMaticbToken: '0xc207D085825B57323B4359c0eE7c286A43952B8f',
  },
};

const DEVELOP_CONFIG: IStkrConfig = {
  ...LOCAL_CONFIG,
};

const GOERLI_CONFIG: IStkrConfig = {
  ...{
    contractConfig: {
      ...LOCAL_CONFIG.contractConfig,
      ...{
        futureBondAVAX: '0xdb08E6fbFd8fF23BF8813968138e95304af1Ff13',
        polygonPool: '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
        aMaticbToken: '0x655D2DB109f703AA85dB46CB25E90806ddaF64cD',
      },
    },
  },
};

const MAINNET_CONFIG: IStkrConfig = {
  contractConfig: {
    ETHContract: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    aethContract: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
    fethContract: '0xD01ef7C0A5d8c432fc2d1a85c66cF2327362E5C6',
    maticToken: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    aMaticbToken: '0x99534Ef705Df1FFf4e4bD7bbaAF9b0dFf038EbFe',
  },
};

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
};

export function configFromEnv(env = currentEnv): IStkrConfig {
  switch (env) {
    case Env.Production:
      return MAINNET_CONFIG;
    case Env.Stage:
      return GOERLI_CONFIG;
    case Env.Develop:
      return DEVELOP_CONFIG;
    default:
      return LOCAL_CONFIG;
  }
}
