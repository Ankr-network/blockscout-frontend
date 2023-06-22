import BigNumber from 'bignumber.js';
import { IBlockchainEntity } from 'multirpc-sdk';

export enum ChainType {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
  Devnet = 'devnet',
}

export enum SortType {
  Name = 'name',
  Usage = 'usage',
}

export enum Timeframe {
  Hour,
  Day,
  Week,
  Month,
}

export interface ChainURL {
  rpc: string;
  ws?: string;
  rest?: string;
}

type MainBlockchainEntity = Exclude<
  IBlockchainEntity,
  'extends' | 'features' | 'paths' | 'id'
>;

export interface Chain extends MainBlockchainEntity {
  id: ChainID;
  isArchive?: boolean;
  isComingSoon: boolean;
  isMainnetComingSoon?: boolean;
  isMainnetPremiumOnly?: boolean;
  extenders?: Chain[];
  extensions?: Chain[];
  urls: ChainURL[];
  totalRequests?: BigNumber;
  chainExtends?: string;
  chainWithoutMainnet?: Partial<Chain>;
  beacons?: Chain[];
  opnodes?: Chain[];
  testnets?: Chain[];
  devnets?: Chain[];
  hasWSFeature: boolean;
  hasRESTFeature: boolean;
  hasRPCFeature: boolean;
}

export type GroupedBlockchainType = Record<string, Chain[]>;

export enum ChainID {
  APTOS = 'aptos',
  ARBITRUM = 'arbitrum',
  ARBITRUM_NOVA = 'arbitrumnova',
  AVALANCHE = 'avalanche',
  AVALANCHE_C = 'avalanche-c',
  AVALANCHE_EVM = 'avalanche-evm',
  AVALANCHE_FUJI = 'avalanche_fuji',
  AVALANCHE_FUJI_C = 'avalanche_fuji-c',
  AVALANCHE_FUJI_EVM = 'avalanche_fuji-evm',
  AVALANCHE_FUJI_P = 'avalanche_fuji-p',
  AVALANCHE_FUJI_X = 'avalanche_fuji-x',
  AVALANCHE_P = 'avalanche-p',
  AVALANCHE_X = 'avalanche-x',
  BSC = 'bsc',
  BSC_TESTNET_CHAPEL = 'bsc_testnet_chapel',
  BTTC = 'bttc',
  CELO = 'celo',
  CHILIZ = 'chiliz',
  CHILIZ_TESTNET = 'chiliz_testnet',
  ETH = 'eth',
  ETH_BEACON = 'eth_beacon',
  ETH_GOERLI = 'eth_goerli',
  ETH_GOERLI_BEACON = 'eth_goerli_beacon',
  ETH_KOVAN = 'eth_kovan',
  ETH_RINKEBY = 'eth_rinkeby',
  ETH_ROPSTEN = 'eth_ropsten',
  ETH_SEPOLIA = 'eth_sepolia',
  ETH_SEPOLIA_BEACON = 'eth_sepolia_beacon',
  FANTOM = 'fantom',
  FANTOM_TESTNET = 'fantom_testnet',
  GNOSIS = 'gnosis',
  GNOSIS_BEACON = 'gnosis_beacon',
  GNOSIS_TESTNET = 'gnosis_testnet',
  HARMONY = 'harmony',
  HORIZEN = 'horizen',
  HORIZEN_TESTNET = 'horizen-testnet',
  HORIZEN_TESTNET_EVM = 'horizen-testnet-evm',
  HECO = 'heco',
  HECO_TESTNET = 'heco_testnet',
  IOTEX = 'iotex',
  IOTEX_TESTNET = 'iotex_testnet',
  KUSAMA = 'kusama',
  METIS = 'metis',
  MOONBEAM = 'moonbeam',
  MULTICHAIN = 'multichain',
  NEAR = 'near',
  NERVOS = 'nervos',
  NERVOS_CKB = 'nervos_ckb',
  NERVOS_GW = 'nervos_gw',
  OPTIMISM = 'optimism',
  OPTIMISM_TESTNET = 'optimism_testnet',
  POLKADOT = 'polkadot',
  POLYGON = 'polygon',
  POLYGON_MUMBAI = 'polygon_mumbai',
  POLYGON_ZKEVM = 'polygon_zkevm',
  POLYGON_ZKEVM_TESTNET = 'polygon_zkevm_testnet',
  ROLLUX = 'rollux',
  ROLLUX_OPNODE = 'rollux_opnode',
  ROLLUX_TESTNET = 'rollux_testnet',
  ROLLUX_OPNODE_TESTNET = 'rollux_opnode_testnet',
  SECRET = 'scrt',
  SECRET_COSMOS = 'scrt_cosmos',
  SECRET_COSMOS_GRPC_WEB = 'scrt-cosmos-grpc-web',
  SECRET_COSMOS_REST = 'scrt-cosmos-rest',
  SECRET_REST = 'scrt-rest',
  SECRET_RPC = 'scrt-rpc',
  SOLANA = 'solana',
  SOLANA_DEVNET = 'solana_devnet',
  SYSCOIN = 'syscoin',
  TRON = 'tron',
  TRON_JSON_RPC = 'tron_jsonrpc',
  TENET = 'tenet',
  TENET_EVM = 'tenet-evm',
  XDAI = 'xdai',
  KLAYTN = 'klaytn',
  SUI = 'sui',
  SUI_TESTNET = 'sui_testnet',
  KLAYTN_TESTNET = 'klaytn_testnet',
  FILECOIN = 'filecoin',
  MANTLE = 'mantle',
  MANTLE_TESTNET = 'mantle_testnet',
  ZETACHAIN = 'zetachain',
  ZETACHAIN_COSMOS_REST_TESTNET = 'zetachain-cosmos-rest-testnet',
  ZETACHAIN_EVM_TESTNET = 'zetachain-evm-testnet',
  ZETACHAIN_TENDERMINT_REST_TESTNET = 'zetachain-tendermint-rest-testnet',
  ZETACHAIN_TENDERMINT_RPC_TESTNET = 'zetachain-tendermint-rpc-testnet',
  ZETACHAIN_TESTNET = 'zetachain-testnet',
  BASE = 'base',
  BASE_TESTNET = 'base_goerli',
  SCROLL = 'scroll',
  SCROLL_TESTNET = 'scroll_testnet',
  ZKSYNC_ERA = 'zksync_era',

  UNDEFINED = '',
}
