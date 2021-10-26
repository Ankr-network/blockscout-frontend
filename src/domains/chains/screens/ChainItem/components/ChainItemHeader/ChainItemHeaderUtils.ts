import { Chain } from '../../../Chains/components/ChainsList/ChainsListTypes';
import { IChainParams } from '../../../../../../modules/auth/actions/addNetwork';

// avalanche
export const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
};
// fantom
const FANTOM_NETWORK_PARAMS = {
  chainId: '0xFA',
  chainName: 'Fantom Opera',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.ftm.tools/'],
  blockExplorerUrls: ['https://ftmscan.com/'],
};
// eth
const ETHEREUM_MAINNET_PARAMS = {
  chainId: '0x1',
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://api.mycryptoapi.com/eth', 'https://cloudflare-eth.com'],
  blockExplorerUrls: ['https://etherscan.io'],
};
// polygon
const POLYGON_NETWORK_PARAMS = {
  chainId: '0x89',
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: [
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
  ],
  blockExplorerUrls: ['https://polygonscan.com/'],
};
// solana
const SOLANA_NETWORK_PARAMS = {
  chainId: '0xE9AC0D6', // wrong network id
  chainName: 'Neon EVM MainNet',
  nativeCurrency: {
    name: 'Neon',
    symbol: 'NEON',
    decimals: 18,
  },
  rpcUrls: ['https://proxy.mainnet.neonlabs.org/solana'],
  blockExplorerUrls: ['https://neon-labs.org/'],
};
// xdai
const XDAI_NETWORK_PARAMS = {
  chainId: '0x64',
  chainName: 'xDAI Chain',
  nativeCurrency: {
    name: 'xDAI',
    symbol: 'xDAI',
    decimals: 18,
  },
  rpcUrls: [
    'https://rpc.xdaichain.com',
    'https://xdai.poanetwork.dev',
    'wss://rpc.xdaichain.com/wss',
    'wss://xdai.poanetwork.dev/wss',
    'http://xdai.poanetwork.dev',
    'https://dai.poa.network',
    'ws://xdai.poanetwork.dev:8546',
  ],
  blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
};
/* map network data for using addNetwork action */
export const getMappedNetwork = (chain: Chain): IChainParams | undefined => {
  switch (chain.id) {
    case 'avalanche':
      return AVALANCHE_MAINNET_PARAMS;
    /* adding ethereum network got error: MetaMask - RPC Error: May not specify default MetaMask chain. */
    case 'eth':
      return undefined;
    case 'fantom':
      return FANTOM_NETWORK_PARAMS;
    case 'polygon':
      return POLYGON_NETWORK_PARAMS;
    /* adding solana network returns error: Request for method 'eth_chainId on https://proxy.mainnet.neonlabs.org/solana failed */
    case 'solana':
      return undefined;
    case 'xdai':
      return undefined;
    default:
      return undefined;
  }
};
