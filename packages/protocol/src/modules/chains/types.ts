import BigNumber from 'bignumber.js';
import { IBlockchainEntity } from 'multirpc-sdk';

export type ChainPath = string;

export enum ChainType {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
  Devnet = 'devnet',
}

export enum ChainSubType {
  Athens3 = 'athens3',
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
  enterprise: string;
  enterpriseWs: string;
}

type MainBlockchainEntity = Exclude<
  IBlockchainEntity,
  'extends' | 'features' | 'id'
>;

export interface ChainBadge extends Chain {
  isSelected: boolean;
}

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
  beacons?: Chain[];
  opnodes?: Chain[];
  testnets?: Chain[];
  devnets?: Chain[];
  hasWSFeature: boolean;
  hasRESTFeature: boolean;
  hasRPCFeature: boolean;
  hasEnterpriseFeature: boolean;
}

export type GroupedBlockchainType = Record<string, Chain[]>;

export enum ChainID {
  ALL_CHAINS = 'all_chains',

  APTOS = 'aptos',
  ARBITRUM = 'arbitrum',
  ARBITRUM_TESTNET = 'arbitrum_testnet',
  ARBITRUM_SEPOLIA = 'arbitrum_sepolia',
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

  AVAIL = 'avail',
  AVAIL_GOLDBERG_TESTNET = 'avail_goldberg_testnet',
  AVAIL_TURING_TESTNET = 'avail_turing_testnet',

  BAHAMUT = 'bahamut',
  BAHAMUT_OCEAN = 'bahamut_ocean',

  BSC = 'bsc',
  BSC_TESTNET_CHAPEL = 'bsc_testnet_chapel',

  BASE = 'base',
  BASE_SEPOLIA = 'base_sepolia',
  BASE_TESTNET = 'base_goerli',

  BERACHAIN = 'berachain',
  BERACHAIN_TESTNET = 'berachain_testnet',
  BERACHAIN_GUARDED_TESTNET = 'berachain-guarded-testnet',
  BERACHAIN_GUARDED_TESTNET_EVM = 'berachain-guarded-testnet-evm',

  BLAST = 'blast',
  BLAST_TESTNET_SEPOLIA = 'blast_testnet_sepolia',

  B2 = 'b2',
  B2_HABITAT_TESTNET = 'b2_habitat_testnet',
  BTTC = 'bttc',
  BTC = 'btc',
  BTC_TESTNET = 'btc_signet',
  BITLAYER = 'bitlayer',
  BITLAYER_TESTNET = 'bitlayer_testnet',
  CELO = 'celo',
  CHILIZ = 'chiliz',
  CHILIZ_TESTNET = 'chiliz_testnet',

  CORE = 'core',

  ETH = 'eth',
  ETH_BEACON = 'eth_beacon',
  ETH_KOVAN = 'eth_kovan',
  ETH_RINKEBY = 'eth_rinkeby',
  ETH_ROPSTEN = 'eth_ropsten',
  ETH_SEPOLIA = 'eth_sepolia',
  ETH_SEPOLIA_BEACON = 'eth_sepolia_beacon',
  ETH_HOLESKY = 'eth_holesky',
  ETH_HOLESKY_BEACON = 'eth_holesky_beacon',
  ELECTRONEUM = 'electroneum',
  ELECTRONEUM_TESTNET = 'electroneum_testnet',

  FANTOM = 'fantom',
  FANTOM_TESTNET = 'fantom_testnet',
  FILECOIN = 'filecoin',

  FLARE = 'flare',
  FLARE_EVM = 'flare-evm',
  FLARE_C = 'flare-c',
  FLARE_P = 'flare-p',
  FLARE_X = 'flare-x',
  FLARE_COSTON = 'flare_coston',
  FLARE_COSTON_EVM = 'flare_coston-evm',
  FLARE_COSTON_C = 'flare_coston-c',
  FLARE_COSTON_P = 'flare_coston-p',
  FLARE_COSTON_X = 'flare_coston-x',
  FLARE_COSTON2 = 'flare_coston2',
  FLARE_COSTON2_EVM = 'flare_coston2-evm',
  FLARE_COSTON2_C = 'flare_coston2-c',
  FLARE_COSTON2_P = 'flare_coston2-p',
  FLARE_COSTON2_X = 'flare_coston2-x',
  FLARE_SONGBIRD = 'flare_songbird',
  FLARE_SONGBIRD_EVM = 'flare_songbird-evm',
  FLARE_SONGBIRD_C = 'flare_songbird-c',
  FLARE_SONGBIRD_P = 'flare_songbird-p',
  FLARE_SONGBIRD_X = 'flare_songbird-x',

  GNOSIS = 'gnosis',
  GNOSIS_BEACON = 'gnosis_beacon',
  GNOSIS_TESTNET = 'gnosis_testnet',
  GNOSIS_TESTNET_BEACON = 'gnosis_testnet_beacon',

  GRAVITY = 'gravity',

  HARMONY = 'harmony',

  HORIZEN = 'horizen',
  HORIZEN_EVM = 'horizen-evm',
  HORIZEN_TESTNET = 'horizen-testnet',
  HORIZEN_TESTNET_EVM = 'horizen-testnet-evm',

  HECO = 'heco',
  HECO_TESTNET = 'heco_testnet',
  IOTEX = 'iotex',
  IOTEX_TESTNET = 'iotex_testnet',

  KAVA = 'kava',
  KAVA_COSMOS_REST = 'kava-cosmos-rest',
  KAVA_EVM = 'kava-evm',
  KAVA_TENDERMINT_REST = 'kava-tendermint-rest',
  KAVA_TENDERMINT_RPC = 'kava-tendermint-rpc',

  KAVA_TESTNET = 'kava-testnet',
  KAVA_COSMOS_REST_TESTNET = 'kava-cosmos-rest-testnet',
  KAVA_EVM_TESTNET = 'kava-evm-testnet',
  KAVA_TENDERMINT_REST_TESTNET = 'kava-tendermint-rest-testnet',
  KAVA_TENDERMINT_RPC_TESTNET = 'kava-tendermint-rpc-testnet',

  KINTO = 'kinto',
  KLAYTN = 'klaytn',
  KLAYTN_TESTNET = 'klaytn_testnet',
  KUSAMA = 'kusama',

  LINEA = 'linea',

  MANTLE = 'mantle',
  MANTLE_TESTNET = 'mantle_testnet',
  MANTLE_SEPOLIA = 'mantle_sepolia',
  METIS = 'metis',
  MOONBEAM = 'moonbeam',
  MULTICHAIN = 'multichain',
  NEAR = 'near',
  NERVOS = 'nervos',
  NERVOS_CKB = 'nervos_ckb',
  NERVOS_GW = 'nervos_gw',

  XLAYER = 'xlayer',
  XLAYER_TESTNET = 'xlayer_testnet',

  OPTIMISM = 'optimism',
  OPTIMISM_SEPOLIA = 'optimism_sepolia',
  OPTIMISM_TESTNET = 'optimism_testnet',

  POLKADOT = 'polkadot',
  POLYGON = 'polygon',
  POLYGON_MUMBAI = 'polygon_mumbai',
  POLYGON_AMOY = 'polygon_amoy',
  POLYGON_ZKEVM = 'polygon_zkevm',
  POLYGON_ZKEVM_TESTNET = 'polygon_zkevm_testnet',
  POLYGON_ZKEVM_CARDONA = 'polygon_zkevm_cardona',
  ROLLUX = 'rollux',
  ROLLUX_OPNODE = 'rollux_opnode',
  ROLLUX_OPNODE_TESTNET = 'rollux_opnode_testnet',
  ROLLUX_TESTNET = 'rollux_testnet',

  SCROLL = 'scroll',
  SCROLL_TESTNET = 'scroll_testnet',
  SCROLL_SEPOLIA_TESTNET = 'scroll_sepolia_testnet',

  SECRET = 'scrt',
  SECRET_COSMOS = 'scrt_cosmos',
  SECRET_COSMOS_GRPC_WEB = 'scrt-cosmos-grpc-web',
  SECRET_COSMOS_REST = 'scrt-cosmos-rest',
  SECRET_REST = 'scrt-rest',
  SECRET_RPC = 'scrt-rpc',

  SEI = 'sei',
  SEI_COSMOS_GRPC_WEB = 'sei-cosmos-grpc-web',
  SEI_COSMOS_REST = 'sei-cosmos-rest',
  SEI_REST = 'sei-rest',
  SEI_RPC = 'sei-rpc',
  SEI_TESTNET = 'sei-testnet',
  SEI_RPC_TESTNET = 'sei-rpc-testnet',
  SEI_REST_TESTNET = 'sei-rest-testnet',
  SEI_COSMOS_REST_TESTNET = 'sei-cosmos-rest-testnet',
  SEI_COSMOS_GRPC_TESTNET = 'sei-cosmos-grpc-web-testnet',

  SOLANA = 'solana',
  SOLANA_DEVNET = 'solana_devnet',

  STELLAR = 'stellar',
  STELLAR_HORIZON = 'stellar-horizon',
  STELLAR_SOROBAN = 'stellar-soroban',
  STELLAR_TESTNET = 'stellar-testnet',
  STELLAR_TESTNET_HORIZON = 'stellar-testnet-horizon',
  STELLAR_TESTNET_SOROBAN = 'stellar-testnet-soroban',

  SYSCOIN = 'syscoin',

  TAIKO = 'taiko',
  TAIKO_HEKLA = 'taiko_hekla',
  TELOS = 'telos',
  TRON = 'tron',
  TRON_JSON_RPC = 'tron_jsonrpc',

  TENET = 'tenet',
  TENET_EVM = 'tenet-evm',

  XAI = 'xai',
  XAI_TESTNET = 'xai_testnet',
  XDAI = 'xdai',

  SUI = 'sui',
  SUI_TESTNET = 'sui_testnet',

  XDC = 'xdc',
  XDC_TESTNET = 'xdc_testnet',

  ZETACHAIN = 'zetachain',

  /* Athens-3 */
  ZETACHAIN_COSMOS_REST_ATHENS_TESTNET = 'zetachain-cosmos-rest-athens-testnet',
  ZETACHAIN_EVM_ATHENS_TESTNET = 'zetachain-evm-athens-testnet',
  ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET = 'zetachain-tendermint-rest-athens-testnet',
  ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET = 'zetachain-tendermint-rpc-athens-testnet',
  ZETACHAIN_ATHENS_TESTNET = 'zetachain-athens-testnet',

  ZKSYNC_ERA = 'zksync_era',
  ZKSYNC_ERA_TESTNET = 'zksync_era_testnet',
  ZKSYNC_ERA_SEPOLIA = 'zksync_era_sepolia',

  UNDEFINED = '',
}

export const ZETACHAIN_ATHENS3_CHAINS = [
  ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET,
  ChainID.ZETACHAIN_EVM_ATHENS_TESTNET,
  ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET,
  ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET,
];

export const FLARE_TESTNETS = [
  ChainID.FLARE_COSTON,
  ChainID.FLARE_COSTON_EVM,
  ChainID.FLARE_COSTON_C,
  ChainID.FLARE_COSTON_P,
  ChainID.FLARE_COSTON_X,
  ChainID.FLARE_COSTON2,
  ChainID.FLARE_COSTON2_EVM,
  ChainID.FLARE_COSTON2_C,
  ChainID.FLARE_COSTON2_P,
  ChainID.FLARE_COSTON2_X,
  ChainID.FLARE_SONGBIRD,
  ChainID.FLARE_SONGBIRD_EVM,
  ChainID.FLARE_SONGBIRD_C,
  ChainID.FLARE_SONGBIRD_P,
  ChainID.FLARE_SONGBIRD_X,
];

export const FLARE_CHAINS = [
  ChainID.FLARE,
  ChainID.FLARE_EVM,
  ChainID.FLARE_C,
  ChainID.FLARE_P,
  ChainID.FLARE_X,
  ...FLARE_TESTNETS,
];

export const ADVANCED_API_CHAINS = {
  mainnets: [
    ChainID.AVALANCHE,
    ChainID.ARBITRUM,
    ChainID.BASE,
    ChainID.BSC,
    ChainID.ETH,
    ChainID.FANTOM,
    ChainID.FLARE,
    ChainID.GNOSIS,
    ChainID.LINEA,
    ChainID.OPTIMISM,
    ChainID.POLYGON,
    ChainID.POLYGON_ZKEVM,
    ChainID.ROLLUX,
    ChainID.SCROLL,
    ChainID.STELLAR,
    ChainID.SYSCOIN,
  ],
  testnets: [
    ChainID.AVALANCHE_FUJI,
    ChainID.POLYGON_AMOY,
    ChainID.BASE_SEPOLIA,
    ChainID.ETH_HOLESKY,
    ChainID.ETH_SEPOLIA,
    ChainID.OPTIMISM_TESTNET,
  ],
};
