import {
  IBalancesEntity,
  ICountersEntity,
  IUsageEntity,
  Web3Address,
} from 'multirpc-sdk';

export type TCountersEntityWithAddress = ICountersEntity & {
  address: Web3Address;
};

export enum ClientType {
  UNKNOWN,
  PAYG,
  ForcedExpirationPremium,
  TestDrivePremium,
  Premium,
  PENDING,
}

export type ClientEntity = IBalancesEntity & {
  type: ClientType;
  ttl?: number;
  email?: string;
};

export type PremiumPlanClientEntity = ICountersEntity & {
  type: ClientType;
  email?: string;
};

export enum ChainID {
  APTOS = 'aptos',
  ARBITRUM = 'arbitrum',
  AVALANCHE = 'avalanche',
  AVALANCHE_C = 'avalanche-c',
  AVALANCHE_EVM = 'avalanche-evm',
  AVALANCHE_P = 'avalanche-p',
  AVALANCHE_X = 'avalanche-x',
  AVALANCHE_FUJI = 'avalanche_fuji',
  AVALANCHE_FUJI_C = 'avalanche_fuji-c',
  AVALANCHE_FUJI_EVM = 'avalanche_fuji-evm',
  AVALANCHE_FUJI_P = 'avalanche_fuji-p',
  AVALANCHE_FUJI_X = 'avalanche_fuji-x',
  BSC = 'bsc',
  BSC_TESTNET_CHAPEL = 'bsc_testnet_chapel',
  BTTC = 'bttc',
  CELO = 'celo',
  ETH = 'eth',
  ETH_GOERLI = 'eth_goerli',
  ETH_KOVAN = 'eth_kovan',
  ETH_RINKEBY = 'eth_rinkeby',
  ETH_ROPSTEN = 'eth_ropsten',
  ETH_SEPOLIA = 'eth_sepolia',
  FANTOM = 'fantom',
  FANTOM_TESTNET = 'fantom_testnet',
  GNOSIS = 'gnosis',
  HARMONY = 'harmony',
  IOTEX = 'iotex',
  IOTEX_TESTNET = 'iotex_testnet',
  METIS = 'metis',
  MOONBEAM = 'moonbeam',
  MULTICHAIN = 'multichain',
  NEAR = 'near',
  NERVOS = 'nervos',
  NERVOS_CKB = 'nervos_ckb',
  NERVOS_GW = 'nervos_gw',
  OPTIMISM = 'optimism',
  OPTIMISM_TESTNET = 'optimism_testnet',
  POLYGON = 'polygon',
  POLYGON_MUMBAI = 'polygon_mumbai',
  HECO = 'heco',
  HECO_TESTNET = 'heco_testnet',
  SOLANA = 'solana',
  SOLANA_DEVNET = 'solana_devnet',
  SYSCOIN = 'syscoin',
  TRON = 'tron',

  UNDEFINED = '',
}

export interface IUsageEntityMapped extends IUsageEntity {
  totalCost?: number;
}
