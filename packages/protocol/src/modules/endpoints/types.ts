import { ChainID, Chain, ChainURL } from '@ankr.com/chains-list';

export interface ChainGroup {
  id: ChainGroupID;
  name: string;
  pluralName: string;
  chains: ChainID[];
}

export enum ChainGroupID {
  C_CHAIN = 'c-chain',
  ETH_MAINNET = 'eth-mainnet',
  GOERLI = 'goerli',
  GRPC = 'grpc',
  HORIZEN = 'horizen',
  JSON_RPC = 'json-rpc',
  KOVAN = 'kovan',
  NEAR = 'near',
  NERVOS_CKB = 'nervos-ckb',
  NERVOS_EVM = 'nervos-evm',
  NERVOS_GW = 'nervos-gw',
  P_CHAIN = 'p-chain',
  REST_API = 'rest-api',
  RINKEBY = 'rinkeby',
  ROPSTEN = 'ropsten',
  HOLESKY = 'holesky',
  TENDERMINT_RPC = 'tendermint-rpc',
  TENDERMINT_REST = 'tendermint-rest',
  COSMOS_REST = 'cosmos-rest',
  SEPOLIA = 'sepolia',
  SOLANA = 'solana',
  SOLANA_DEVNET = 'solana_devnet',
  STANDARD_EVM = 'standard-evm',
  X_CHAIN = 'x-chain',
  SUI = 'SUI',
  TENET = 'tenet',
  SCROLL_ALPHA = 'scroll_testnet',
  KAVA_COSMOS_REST = 'kava-cosmos-rest',
  KAVA_EVM = 'kava-evm',
  KAVA_TENDERMINT_REST = 'kava-tendermint-rest',
  KAVA_TENDERMINT_RPC = 'kava-tendermint-rpc',
  STELLAR_HORIZON = 'stellar-horizon',
  STELLAR_SOROBAN = 'stellar-soroban',
  MUMBAI = 'mumbai',
  AMOY = 'amoy',
  CARDONA = 'cardona',
  POLYGON_TESTNET = 'testnet',
  FLARE_COSTON = 'flare-coston',
  FLARE_COSTON2 = 'flare-coston2',
  FLARE_SONGBIRD = 'flare-songbird',
  GOLDBERG = 'goldberg',
  TURING = 'turing',
  BTC = 'btc',
  BTC_BLOCKBOOK = 'btc_blockbook',
  ZERO_G_COSMOS_REST = '0g_cosmos_rest',
  ZERO_G_EVM = '0g_evm',
  TON_REST = 'ton_rest',
  TON_RPC = 'ton_rpc',
  FUEL_GRAPH_QL = 'fuel-graph-ql',

  FALLBACK = 'FALLBACK',
}

export const FLARE_TESTNETS_GROUPS_LIST = [
  ChainGroupID.FLARE_COSTON,
  ChainGroupID.FLARE_COSTON2,
  ChainGroupID.FLARE_SONGBIRD,
];

export const nonEvmGroupsList = [
  ChainGroupID.C_CHAIN,
  ChainGroupID.X_CHAIN,
  ChainGroupID.P_CHAIN,
  ChainGroupID.NERVOS_CKB,
  ChainGroupID.NERVOS_GW,
];

export interface EndpointGroup {
  chainName: string;
  id: ChainGroupID;
  name: ChainGroup['name'];
  pluralName: ChainGroup['pluralName'];
  urls: ChainURL[];
  urlsCount: number;
  chains: Chain[];
  beacons?: EndpointGroup[];
  opnodes?: EndpointGroup[];
}

export interface GroupedEndpoints {
  mainnet: EndpointGroup[];
  testnet: EndpointGroup[];
  devnet: EndpointGroup[];
  beaconsMainnet: EndpointGroup[];
  opnodesMainnet: EndpointGroup[];
  beaconsTestnet: EndpointGroup[];
  opnodesTestnet: EndpointGroup[];
}
